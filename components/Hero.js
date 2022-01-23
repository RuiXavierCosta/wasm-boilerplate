import React, { useState } from 'react';

import useScrollPosition from 'scripts/use-scroll-position';

export default React.forwardRef(function Hero(props, ref) {
  const [heroTitleLeft, setHeroTitleLeft] = useState(50);
  const [heroBackgroundWidth, setHeroBackgroundWidth] = useState(100);

  const animateHero = (scrollPosition) => {
    if(scrollPosition > 10) {
      setHeroBackgroundWidth(50)
      setHeroTitleLeft(0);
    } else {
      setHeroBackgroundWidth(100);
      setHeroTitleLeft(50);
    }
  }

  const handleScroll = (positionInfo) => {
    const scrollPosition = positionInfo?.position ?? 0;
    animateHero(scrollPosition);
  }

  useScrollPosition(handleScroll);

  const style = `
  :root {
    --hero-title-left: ${heroTitleLeft}%;
    --hero-bacground-width: ${heroBackgroundWidth}%;
  }
  `;

  return (
    <section ref={ref} className="hero container h-100 d-flex flex-column justify-content-center">
      <style>{style}</style>
      <div className="background-element"></div>
      <div className="greeting px-0 px-sm-5 mx-0">
        <span className="greeting__start h3">HE</span>
        <span className="greeting__end h3">LLO</span>
      </div>
    </section>
  );
});