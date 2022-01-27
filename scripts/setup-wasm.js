export default async function setupWASM() {
  if (typeof Go === 'undefined') {
    return;
  }

  const go = new Go();
  const script = await WebAssembly.instantiateStreaming(
    fetch("wasm/main.wasm"),
    go.importObject,
  )
  
  go.run(script.instance);
}