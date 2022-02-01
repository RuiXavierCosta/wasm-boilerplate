import React from 'react';

export default React.forwardRef(function CodeExample ({ title, description, JS, WASM, results }, ref) {
  return (
    <section ref={ref} className="code-example container h-100 d-flex flex-column justify-content-center">
      <div className="code-content px-2 ps-sm-3 pe-sm-3 w-100">
        <div className="row">
          <span className="h5 w-auto my-1">{ title }</span>
          <button className="btn btn-light w-auto ms-2">Run</button>
        </div>
        <div className="row">
          <p>{ description }</p>
        </div>

        <div className="row comparisson">
          <div className="js col-12 col-sm-6">
            <pre className="code-snippet language-js" tabIndex="0">
              <code>{ JS.code }</code>
            </pre>
            <p>Time for JS execution: { JS.time }ms</p>
          </div>
          <div className="wasm col-12 col-sm-6">
            <pre className="code-snippet language-go" tabIndex="0">
              <code>{ WASM.code }</code>
            </pre>
            <p>Time for WASM execution: { JS.time }ms</p>
          </div>
        </div>
        <button className="btn btn-light w-auto mb-2">Run Code</button>
        <p>{ results }</p>
      </div>
    </section>
  );
});
