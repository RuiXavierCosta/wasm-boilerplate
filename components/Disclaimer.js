import React from "react";

export default React.forwardRef(function Disclaimer(props, ref) {
  const mailToInfo = [
    `subject=${encodeURIComponent("Hi Xavier!")}`,
    `body=${encodeURIComponent(
      "I think you should stop writing Go and stick to Javascript 😂"
    )}`
  ];
  const parsedMailTo = `mailto:ruixaviercosta@gmail.com?${mailToInfo.join(
    "&"
  )}`;

  return (
    <section
      ref={ref}
      className="disclaimer container h-100 d-flex flex-column justify-content-center"
    >
      <div className="disclaimer-content px-3 ps-md-5 pe-md-0">
        <p className="h5 text-center">Disclaimer</p>
        <p className="mb-0">
          The algorithms used in this demo are far from optimized, and are just
          some random code I made up on the spot, or got from the internet.{" "}
          <br />
          This was intended to be more of a test to WASM's capabilities than a
          reliable benchmark.
          <br />
          Feel free to{" "}
          <a
            href={parsedMailTo}
            className="text-light text-decoration-underline"
            target="_blank"
            rel="noreferrer"
          >
            suggest any alteration or point out any mistake
          </a>{" "}
          I might have done!
        </p>
      </div>
    </section>
  );
});
