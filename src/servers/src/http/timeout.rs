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

use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};
use std::time::Duration;

use axum::body::Body;
use axum::http::Request;
use axum::response::Response;
use pin_project::pin_project;
use tokio::time::Sleep;
use tower::timeout::error::Elapsed;
use tower::{BoxError, Layer, Service};

use crate::http::header::constants::GREPTIME_DB_HEADER_TIMEOUT;

/// [`Timeout`] response future
///
/// [`Timeout`]: crate::timeout::Timeout
///
/// Modified from https://github.com/tower-rs/tower/blob/8b84b98d93a2493422a0ecddb6251f292a904cff/tower/src/timeout/future.rs
#[derive(Debug)]
#[pin_project]
pub struct ResponseFuture<T> {
    #[pin]
    response: T,
    #[pin]
    sleep: Sleep,
}

impl<T> ResponseFuture<T> {
    pub(crate) fn new(response: T, sleep: Sleep) -> Self {
        ResponseFuture { response, sleep }
    }
}

impl<F, T, E> Future for ResponseFuture<F>
where
    F: Future<Output = Result<T, E>>,
    E: Into<BoxError>,
{
    type Output = Result<T, BoxError>;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        let this = self.project();

        // First, try polling the future
        match this.response.poll(cx) {
            Poll::Ready(v) => return Poll::Ready(v.map_err(Into::into)),
            Poll::Pending => {}
        }

        // Now check the sleep
        match this.sleep.poll(cx) {
            Poll::Pending => Poll::Pending,
            Poll::Ready(_) => Poll::Ready(Err(Elapsed::new().into())),
        }
    }
}

/// Applies a timeout to requests via the supplied inner service.
///
/// Modified from https://github.com/tower-rs/tower/blob/8b84b98d93a2493422a0ecddb6251f292a904cff/tower/src/timeout/layer.rs
#[derive(Debug, Clone)]
pub struct DynamicTimeoutLayer {
    default_timeout: Duration,
}

impl DynamicTimeoutLayer {
    /// Create a timeout from a duration
    pub fn new(default_timeout: Duration) -> Self {
        DynamicTimeoutLayer { default_timeout }
    }
}

impl<S> Layer<S> for DynamicTimeoutLayer {
    type Service = DynamicTimeout<S>;

    fn layer(&self, service: S) -> Self::Service {
        DynamicTimeout::new(service, self.default_timeout)
    }
}

/// Modified from https://github.com/tower-rs/tower/blob/8b84b98d93a2493422a0ecddb6251f292a904cff/tower/src/timeout/mod.rs
#[derive(Clone)]
pub struct DynamicTimeout<S> {
    inner: S,
    default_timeout: Duration,
}

impl<S> DynamicTimeout<S> {
    /// Create a new [`DynamicTimeout`] with the given timeout
    pub fn new(inner: S, default_timeout: Duration) -> Self {
        DynamicTimeout {
            inner,
            default_timeout,
        }
    }
}

impl<S> Service<Request<Body>> for DynamicTimeout<S>
where
    S: Service<Request<Body>, Response = Response> + Send + 'static,
    S::Error: Into<BoxError>,
{
    type Response = S::Response;
    type Error = BoxError;
    type Future = ResponseFuture<S::Future>;

    fn poll_ready(&mut self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        match self.inner.poll_ready(cx) {
            Poll::Pending => Poll::Pending,
            Poll::Ready(r) => Poll::Ready(r.map_err(Into::into)),
        }
    }

    fn call(&mut self, request: Request<Body>) -> Self::Future {
        let user_timeout = request
            .headers()
            .get(GREPTIME_DB_HEADER_TIMEOUT)
            .and_then(|value| {
                value
                    .to_str()
                    .ok()
                    .and_then(|value| humantime::parse_duration(value).ok())
            });
        let response = self.inner.call(request);
        let sleep = tokio::time::sleep(user_timeout.unwrap_or(self.default_timeout));
        ResponseFuture::new(response, sleep)
    }
}