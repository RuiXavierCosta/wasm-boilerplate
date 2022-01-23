
import React, { useState, useEffect } from 'react';

import useScrollPosition from 'scripts/use-scroll-position';
import {
  getElementPositions,
  getIntersections,
  getBackgroundFromIntersections
} from 'scripts/scroll-helpers';
import { INTERSECTION_CROSSOVER } from 'scripts/constants';


export default function BackgroundBar({ sections }) {
  const [countainerBackground, setContainerBackground] = useState('');

  const updateBackground = (positions) => {
    const intersections = getIntersections(positions, window.innerHeight / 2, INTERSECTION_CROSSOVER);
    const background = getBackgroundFromIntersections(sections, intersections);
    setContainerBackground(background);
  }

  const handleScroll = () => {
    const positions = getElementPositions(sections);
    updateBackground(positions);
  }

  useEffect(handleScroll);
  useScrollPosition(handleScroll);
  const style = `
    :root {
      --dynamic-bg-color: ${countainerBackground};
    }
  `;

  return ( 
    <div className="background-container container">
      <style>{style}</style>
      <div className="full-background"></div>
    </div>
  );
};