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

const code = {
  code1: {
    title: 'Some example title.',
    description: 'Some example description.',
    JS: {
      code: 'some code',
      time: 500,
    },
    WASM: {
      code: 'some other code',
      time: 100,
    },
    results: 'We can see something.'
  }
};

export default function Home() {
  useEffect(async ()=> {
    await setupWASM();
    sayHi();
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
      <CodeExample ref={sections.code2.el} {...code.code1}/>
      <CodeExample ref={sections.code3.el} {...code.code1}/>
      <Footer ref={sections.footer.el}/>
      <div className="bottom-overflow"></div>
    </>
  )
}
