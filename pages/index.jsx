import React from 'react';
import Head from 'next/head';

import Color from 'scripts/Color';
import { BLUES } from 'scripts/constants';

import Navbar from 'components/Navbar';
import BackgroundBar from 'components/BackgroundBar';
import ShortBio from 'components/ShortBio';
import Footer from 'components/Footer';

const sections = {
  shortBio: {
    el: React.createRef(),
    title: 'Bio',
    color: new Color(...BLUES[1]),
  },
  footer: {
    el: React.createRef(),
    title: 'Contacts',
    color: new Color(...BLUES[1]),
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Xavier Costa | Software Engineer</title>
      </Head>
      <Navbar sections={sections} />
      <BackgroundBar sections={sections} />
      <ShortBio ref={sections.shortBio.el}/>
      <Footer ref={sections.footer.el}/>
      <div className="bottom-overflow"></div>
    </>
  )
}
