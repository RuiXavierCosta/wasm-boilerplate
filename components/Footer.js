import React from "react";
import Image from "next/image";

import linkedinLogo from "../public/svgs/linkedin-logo.svg";
import githubLogo from "../public/svgs/github-logo.svg";
import codepenLogo from "../public/svgs/codepen-logo.svg";
import portraitPhoto from "../public/portrait.jpg";

export default React.forwardRef(function Footer(props, ref) {
  const mailToInfo = [
    `subject=${encodeURIComponent("Hi Xavier!")}`,
    `body=${encodeURIComponent("Just wanted to say Hello!")}`
  ];

  const parsedMailTo = `mailto:ruixaviercosta@gmail.com?${mailToInfo.join(
    "&"
  )}`;

  return (
    <footer
      ref={ref}
      className="container d-flex flex-column justify-content-between align-items-start py-5"
    >
      <div className="half-background portrait-background d-none d-md-block">
        <Image
          layout="fill"
          objectFit="cover"
          src={portraitPhoto}
          alt="Xavier Costa's Portrait"
        />
      </div>
      <a
        href={parsedMailTo}
        className="footer-content email-link justify-self-start ms-5 mt-2 mb-5"
        target="_blank"
        rel="noreferrer"
      >
        <p className="h1 mb-0">ruixaviercosta</p>
        <p className="h3">@gmail.com</p>
      </a>
      <div className="footer-content justify-self-end mt-5 ms-5">
        <p className="say-hi fs-6">
          I&apos;m always open to new <br />
          challenges and ideas. <br />
          Don&apos;t forget to{" "}
          <a
            href={parsedMailTo}
            className="text-light text-decoration-underline"
            target="_blank"
            rel="noreferrer"
          >
            say hi!
          </a>
        </p>
        <div className="link-container mt-5 d-flex">
          <a
            href="https://www.linkedin.com/in/ruixaviercosta"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              height={32}
              width={32}
              className="external-logo"
              src={linkedinLogo}
              alt="Linkedin Profile"
            />
          </a>
          <a
            href="https://github.com/RuiXavierCosta"
            className="ms-3"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              height={32}
              width={32}
              className="external-logo"
              src={githubLogo}
              alt="Github Profile"
            />
          </a>
          <a
            href="https://codepen.io/XavierCosta"
            className="ms-3"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              height={32}
              width={32}
              className="external-logo"
              src={codepenLogo}
              alt="Codepen Profile"
            />
          </a>
        </div>
        <p className="name-and-city mt-4">
          Xavier Costa <br />
          Oporto, Portugal
        </p>
      </div>
    </footer>
  );
});
