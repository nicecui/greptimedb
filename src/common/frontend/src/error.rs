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

use common_error::ext::{BoxedError, ErrorExt};
use common_error::status_code::StatusCode;
use common_macro::stack_trace_debug;
use snafu::{Location, Snafu};

#[derive(Snafu)]
#[snafu(visibility(pub))]
#[stack_trace_debug]
pub enum Error {
    #[snafu(display("External error"))]
    External {
        #[snafu(implicit)]
        location: Location,
        source: BoxedError,
    },

    #[snafu(display("Failed to list nodes from metasrv"))]
    Meta {
        source: Box<meta_client::error::Error>,
        #[snafu(implicit)]
        location: Location,
    },

    #[snafu(display("Failed to parse process id: {}", s))]
    ParseProcessId {
        s: String,
        #[snafu(implicit)]
        location: Location,
    },

    #[snafu(display("Failed to invoke list process service"))]
    ListProcess {
        #[snafu(source)]
        error: tonic::Status,
        #[snafu(implicit)]
        location: Location,
    },

    #[snafu(display("Failed to invoke list process service"))]
    CreateChannel {
        source: common_grpc::error::Error,
        #[snafu(implicit)]
        location: Location,
    },
}

pub type Result<T> = std::result::Result<T, Error>;

impl ErrorExt for Error {
    fn status_code(&self) -> StatusCode {
        use Error::*;
        match self {
            External { source, .. } => source.status_code(),
            Meta { source, .. } => source.status_code(),
            ParseProcessId { .. } => StatusCode::InvalidArguments,
            ListProcess { .. } => StatusCode::External,
            CreateChannel { source, .. } => source.status_code(),
        }
    }

    fn as_any(&self) -> &dyn std::any::Any {
        self
    }
}
