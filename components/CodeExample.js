import React from 'react';

export default React.forwardRef(function CodeExample ({ title, description, JS, WASM, results }, ref) {
  return (
    <section ref={ref} className="code-example container h-100 d-flex flex-column justify-content-center">
      <div className="code-content px-2 ps-sm-3 pe-sm-3 w-100">
        <p className="h5">{ title }</p>
        <p>{ description }</p>
        <div className="row comparisson">
          <div className="js col-12 col-sm-6">
            <pre>{ JS.code }</pre>
            <p>Time for JS execution: { JS.time }ms</p>
          </div>
          <div className="wasm col-12 col-sm-6">
            <pre>{ WASM.code }</pre>
            <p>Time for WASM execution: { JS.time }ms</p>
          </div>
        </div>
        <p>{ results }</p>
      </div>
    </section>
  );
});
