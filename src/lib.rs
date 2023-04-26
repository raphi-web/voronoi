use wasm_bindgen::{__rt::IntoJsResult, prelude::*};
mod voroni;
use js_sys;
use voroni::gen_voronoi;
extern crate console_error_panic_hook;

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
/// This function gets called by javascript
/// It uses the gen_voronoi function from the voroni module
/// and returns a 3D Array of polygons to javascript
/// remember that the return value is already a javascript array not a
/// rust - vector
pub fn voronoi(x: Vec<f64>, y: Vec<f64>, window_size: f64) -> js_sys::Array {
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
