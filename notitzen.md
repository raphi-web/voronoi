

wasm-pack build --target web --features=parallel


RUSTFLAGS='-C target-feature=+atomics,+bulk-memory,+mutable-globals' \
	rustup run nightly \
	wasm-pack build --target web [...] \
	-- -Z build-std=panic_abort,
    

RUSTFLAGS='-C target-feature=+atomics,+bulk-memory,+mutable-globals' \
rustup run nightly \
wasm-pack build --features=parallel --target web ./ -Z build-std=panic_abort,std  

pub use wasm_bindgen_rayon::init_thread_pool;



wasm-pack build --features=parallel --target web