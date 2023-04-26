# Voronoi Diagram

This program uses WebAssembly (WASM) to compute the Voronoi diagram of randomly generated points.
The computation of the Diagram is done by WASM, the rendering by p5.js [https://p5js.org/].

The program utilizes Fortunes Algorithm [https://en.wikipedia.org/wiki/Fortune%27s_algorithm].
But I did not implement it myself, I use this crate: [https://crates.io/crates/voronoi].

Basically the idea behid using WASM is that the heavy lifting part of the program is done in the WASM Virtual Machine which can run at near
native speed and is much faster than JavaScript. To genearate the WASM I used the Rust Programming language and WASM-Pack. The Rust Code is compiled with WebAssembly as target.
The already compiled version is available in the `.pkg` directory.
To compile it yourself use `wasm-pack build --target web`.

Then run it using `python3 srvr.py` and open the link in the browser,  
navigate to the www directory in your browser. This is just a small webserver for hosting the website.