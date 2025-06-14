// Copyright 2023 Greptime Team
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use std::sync::Arc;
use std::time::Duration;

use api::v1::meta::cluster_server::ClusterServer;
use api::v1::meta::heartbeat_server::HeartbeatServer;
use api::v1::meta::procedure_service_server::ProcedureServiceServer;
use api::v1::meta::store_server::StoreServer;
use client::client_manager::NodeClients;
use common_grpc::channel_manager::{ChannelConfig, ChannelManager};
use common_meta::key::TableMetadataManager;
use common_meta::kv_backend::etcd::EtcdStore;
use common_meta::kv_backend::memory::MemoryKvBackend;
use common_meta::kv_backend::{KvBackendRef, ResettableKvBackendRef};
use hyper_util::rt::TokioIo;
use servers::grpc::GrpcOptions;
use tonic::codec::CompressionEncoding;
use tower::service_fn;

use crate::add_compressed_service;
use crate::metasrv::builder::MetasrvBuilder;
use crate::metasrv::{Metasrv, MetasrvOptions, SelectorRef};

#[derive(Clone)]
pub struct MockInfo {
    pub server_addr: String,
    pub channel_manager: ChannelManager,
    pub metasrv: Arc<Metasrv>,
    pub kv_backend: KvBackendRef,
    pub in_memory: Option<ResettableKvBackendRef>,
}

pub async fn mock_with_memstore() -> MockInfo {
    let kv_backend = Arc::new(MemoryKvBackend::new());
    let in_memory = Arc::new(MemoryKvBackend::new());
    mock(
        MetasrvOptions {
            grpc: GrpcOptions {
                server_addr: "127.0.0.1:3002".to_string(),
                ..Default::default()
            },
            ..Default::default()
        },
        kv_backend,
        None,
        None,
        Some(in_memory),
    )
    .await
}

pub async fn mock_with_etcdstore(addr: &str) -> MockInfo {
    let kv_backend = EtcdStore::with_endpoints([addr], 128).await.unwrap();
    mock(
        MetasrvOptions {
            grpc: GrpcOptions {
                server_addr: "127.0.0.1:3002".to_string(),
                ..Default::default()
            },
            ..Default::default()
        },
        kv_backend,
        None,
        None,
        None,
    )
    .await
}

pub async fn mock(
    opts: MetasrvOptions,
    kv_backend: KvBackendRef,
    selector: Option<SelectorRef>,
    datanode_clients: Option<Arc<NodeClients>>,
    in_memory: Option<ResettableKvBackendRef>,
) -> MockInfo {
    let server_addr = opts.grpc.server_addr.clone();
    let table_metadata_manager = Arc::new(TableMetadataManager::new(kv_backend.clone()));

    table_metadata_manager.init().await.unwrap();

    let builder = MetasrvBuilder::new()
        .options(opts)
        .kv_backend(kv_backend.clone());

    let builder = match selector {
        Some(s) => builder.selector(s),
        None => builder,
    };

    let builder = match datanode_clients {
        Some(clients) => builder.node_manager(clients),
        None => builder,
    };

    let builder = match &in_memory {
        Some(in_memory) => builder.in_memory(in_memory.clone()),
        None => builder,
    };

    let metasrv = builder.build().await.unwrap();
    metasrv.try_start().await.unwrap();

    let (client, server) = tokio::io::duplex(1024);
    let metasrv = Arc::new(metasrv);
    let service = metasrv.clone();

    let _handle = tokio::spawn(async move {
        let mut router = tonic::transport::Server::builder();
        let router = add_compressed_service!(router, HeartbeatServer::from_arc(service.clone()));
        let router = add_compressed_service!(router, StoreServer::from_arc(service.clone()));
        let router =
            add_compressed_service!(router, ProcedureServiceServer::from_arc(service.clone()));
        let router = add_compressed_service!(router, ClusterServer::from_arc(service.clone()));
        router
            .serve_with_incoming(futures::stream::iter(vec![Ok::<_, std::io::Error>(server)]))
            .await
    });

    let config = ChannelConfig::new()
        .timeout(Duration::from_secs(10))
        .connect_timeout(Duration::from_secs(10))
        .tcp_nodelay(true);
    let channel_manager = ChannelManager::with_config(config);

    // Move client to an option so we can _move_ the inner value
    // on the first attempt to connect. All other attempts will fail.
    let mut client = Some(client);
    let res = channel_manager.reset_with_connector(
        &server_addr,
        service_fn(move |_| {
            let client = client.take();

            async move {
                if let Some(client) = client {
                    Ok(TokioIo::new(client))
                } else {
                    Err(std::io::Error::other("Client already taken"))
                }
            }
        }),
    );
    let _ = res.unwrap();

    MockInfo {
        server_addr,
        channel_manager,
        metasrv,
        kv_backend,
        in_memory,
    }
}
