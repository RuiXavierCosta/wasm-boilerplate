import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import useScrollPosition from 'scripts/use-scroll-position';
import {
  getElementPositions,
  getIntersections,
  getTitleFromIntersection,
} from 'scripts/scroll-helpers';

export default function Navbar({sections}) {
  const [sectionName, setSectionName] = useState('');

  const updateSectionTitle = (positions) => {
    const intersections = getIntersections(positions, window.innerHeight / 2, 0);
    const background = getTitleFromIntersection(sections, intersections);
    setSectionName(background);
  };

  const handleScroll = () => {
    const positions = getElementPositions(sections);
    updateSectionTitle(positions);
  }


  useEffect(handleScroll);
  useScrollPosition(handleScroll);

  return (
      <nav className="navbar position-relative">
        <div className="nav-content position-fixed w-100 py-2 py-md-3 px-md-0 container top-0 bg-light text-dark d-flex justify-content-between align-items-center">
          <p className="h6 m-0">{ sectionName }</p>
          <Link href="/">
            <a className="nav-link m-0">Xavier Costa</a>
          </Link>
          {/* <p className="h6 m-0 font-monospace">Menu</p> */}
        </div>
      </nav>
  );
}
