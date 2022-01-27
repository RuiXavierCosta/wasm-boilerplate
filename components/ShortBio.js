import React from 'react';

export default React.forwardRef(function ShortBio (props, ref) {
  return (
    <section ref={ref} className="short-bio container h-100 d-flex flex-column justify-content-center">
      <div className="bio-content px-2 ps-sm-5 pe-sm-0 w-50">
        <p className="h5">Let's see how good WASM really can be</p>
        <p className="mb-0">
          This is a small project built with the intention of testing Web Assembly.
          It's main purpose is to compare the execution times between vanilla Javascript
          and Web Assembly.
        </p>
      </div>
    </section>
  );
});
