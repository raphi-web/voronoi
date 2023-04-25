use wasm_bindgen::{__rt::IntoJsResult, prelude::*};
mod voroni;
use js_sys;
use web_sys::console;
use std::panic;
use voroni::gen_voronoi;
extern crate console_error_panic_hook;

//#[cfg(feature = "paralell")]
//#[allow(another_lint)]
//mod par_delauney;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, delauney!");
}

#[wasm_bindgen]
pub fn testing(x: Vec<f32>) {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
    alert(x[0].to_string().as_str());
}

#[wasm_bindgen]
pub fn voronoi(x: Vec<f64>, y: Vec<f64>, window_size:f64) -> js_sys::Array {
   
    let result = gen_voronoi(&x, &y, window_size);
    let js_result = js_sys::Array::new();
    for v in result.iter() {
        let poly = js_sys::Array::new();
        for p in v.iter() {
            let x = p[0].into_js_result().unwrap();
            let y = p[1].into_js_result().unwrap();
            let pnt = js_sys::Array::new();
            pnt.push(&x);
            pnt.push(&y);
            poly.push(&pnt);
        }
        js_result.push(&poly);
    }
    js_result
}

pub fn console_log() {
    web_sys::console::log_2(&"%s : Hello World".into(), &"John".into());
}
