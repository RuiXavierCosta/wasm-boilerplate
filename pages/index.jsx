import React, { useEffect } from 'react';
import Head from 'next/head';

import setupWASM from 'scripts/setup-wasm';
import Color from 'scripts/Color';
import { BLUES } from 'scripts/constants';

import Navbar from 'components/Navbar';
import BackgroundBar from 'components/BackgroundBar';
import ShortBio from 'components/ShortBio';
import CodeExample from 'components/CodeExample';
import Footer from 'components/Footer';

const sections = {
  shortBio: {
    el: React.createRef(),
    title: 'WASM Benchmark',
    color: new Color(...BLUES[1]),
  },
  code1: {
    el: React.createRef(),
    title: 'Example #1',
    color: new Color(...BLUES[2]),
  },
  code2: {
    el: React.createRef(),
    title: 'Example #2',
    color: new Color(...BLUES[3]),
  },
  code3: {
    el: React.createRef(),
    title: 'Example #3',
    color: new Color(...BLUES[2]),
  },
  footer: {
    el: React.createRef(),
    title: 'Contacts',
    color: new Color(...BLUES[1]),
  },
};

const orderNames = () => {
  console.log('ordering JS');
  [...randomNames].sort(); // deconstruct to new array to stop mutation
  console.log('ordered JS');
}

const code = {
  code1: {
    title: 'Order an array strings',
    description: `Let\s start with an <a href="/mock-data.js" target="example-data" class="text-light text-decoration-underline">array with 20 000 random names</a>, and see how fast each approach handles this.
One small thing we needed to do, was to deconstruct the array ([...randomNames]) to stop mutation. To be fair, this could
be done before-hand, but it shouldn't make much difference at all (I tested)`,
    JS: {
      code: `[...randomNames].sort();`,
      callback: () => orderNames(),
    },
    WASM: {
      code: 'sort.Strings(randomNames)',
      callback: () => sortStringsWasm(),
    },
    uri: '#order-string-array',
  }
  // Remove repeated string array
  // Generate Array
  // JSON parse
  // FFT
  // Filter array
};

export default function Home() {
  useEffect(async ()=> {
    await setupWASM();
    if(typeof encodedNames !== 'undefined') {
      loadNamesToGo(encodedNames);
    }
  });

  return (
    <>
      <Head>
        <title>WASM Benchmark | Xavier Costa</title>
      </Head>
      <Navbar sections={sections} />
      <BackgroundBar sections={sections} />
      <ShortBio ref={sections.shortBio.el}/>
      <CodeExample ref={sections.code1.el} {...code.code1}/>
      {/* <CodeExample ref={sections.code2.el} {...code.code1}/>
      <CodeExample ref={sections.code3.el} {...code.code1}/> */}
      <Footer ref={sections.footer.el}/>
      <div className="bottom-overflow"></div>
    </>
  )
}
