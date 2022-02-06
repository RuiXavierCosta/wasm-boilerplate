import React, { useState } from 'react';

export default React.forwardRef(function CodeExample ({ title, description, JS, WASM, results, uri }, ref) {
  const [JSResults, setJSResults] = useState({ time: null });
  const [WASMResults, setWASMResults] = useState({ time: null });

  const runExamples = () => {
    const JSt0 = performance.now();
    JS.callback();
    const JSt1 = performance.now();
    const JSTime =  Math.round(JSt1 - JSt0);
    setJSResults({ time: JSTime });

    const WASMt0 = performance.now();
    WASM.callback()
    const WASMt1 = performance.now();
    const WASMTime =  Math.round(WASMt1 - WASMt0);
    setWASMResults({ time: WASMTime });
  }

  const getResults = () => {
    if(!JSResults.time || !WASMResults.time) {
      return '';
    }

    const wasm = WASMResults.time;
    const js = JSResults.time;
    if(js < wasm) {
      const percentage = Math.round((wasm / js) * 100);
      return <p>JavaScript was {percentage}% faster than Web Assembly... WOOOPS that's a little akward. 😅</p>
    }

    if(wasm <= js) {
      const percentage = Math.round((js / wasm) * 100);
      return <p>Web Assembly was {percentage}% faster than Javascript.</p>
    }
  }

  return (
    <section ref={ref} className="code-example container h-100 d-flex flex-column justify-content-center">
      <div className="code-content px-2 ps-md-3 pe-md-3 py-5 w-100">
        <div className="row mb-3">
          <span className="h5 w-auto my-1">
            <a href={uri} className="text-primary">#</a> { title }
          </span>
          <button className="btn btn-light w-auto ms-2" onClick={runExamples}>Run</button>
        </div>
        <div className="row mb-3">
          <p className="code-description" dangerouslySetInnerHTML={{__html: description }} />
        </div>

        <div className="row comparisson mb-1">
          <div className="js col-12 col-md-6">
            <pre className="code-snippet language-js" tabIndex="0">
              <code>{ JS.code }</code>
            </pre>
            { JSResults.time && <p>Time for JS execution: { JSResults.time }ms</p> }
          </div>
          <div className="wasm col-12 col-md-6">
            <pre className="code-snippet language-go" tabIndex="0">
              <code>{ WASM.code }</code>
            </pre>
            { WASMResults.time && <p>Time for WASM execution: { WASMResults.time }ms</p> }
          </div>
        </div>
        { (JSResults.time && WASMResults.time) && getResults() }
        <button className="btn btn-light w-auto mb-2" onClick={runExamples}>Run Code</button>
      </div>
    </section>
  );
});
