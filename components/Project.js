import React from 'react';

export default React.forwardRef(function Projects ({ name, url }, ref) {
  return (
    <section ref={ref} className="short-bio container h-100 d-flex flex-column justify-content-center">
      <div className="bio-content px-2 ps-sm-5 pe-sm-0">
        <p className="h2 mb-0"> I’m a software engineer</p>
        <p className="h2 mb-0">{ name } { url }</p>
      </div>
    </section>
  );
});
