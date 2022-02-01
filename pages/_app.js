import Script from 'next/script';

import '@styles/main.scss';

function Application({ Component, pageProps }) {

  return (
    <>
      <Script src="wasmExec.js" strategy="beforeInteractive"></Script>
      <Script src="prism.js" strategy="beforeInteractive"></Script>
      <Component {...pageProps} />
    </>
  );
}

export default Application
