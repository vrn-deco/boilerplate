#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

#[napi]
fn sum(a: i32, b: i32) -> i32 {
  a + b
}

#[napi]
fn minus(a: i32, b: i32) -> i32 {
  a - b
}

#[napi]
fn mul(a: i32, b: i32) -> i32 {
  a * b
}

#[napi]
fn div(a: i32, b: i32) -> i32 {
  a / b
}
