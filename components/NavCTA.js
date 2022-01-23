import Image from 'next/image';
import { useState } from 'react';

import arrowDown from '../public/svgs/arrow-down.svg';
import useScrollPosition from 'scripts/use-scroll-position';

const MINIMUM_HEIGHT_TO_SHOW_NAV_CTA = 80;

export default function NavCTA() {
  const [hideCTA, setHideCTA] = useState(0);

  const shouldHideCTA = ({ position }) => {
    const body = document.querySelector('body');
    const { scrollHeight } = body;
    const maxScroll = scrollHeight - window.innerHeight;

    setHideCTA(MINIMUM_HEIGHT_TO_SHOW_NAV_CTA > (maxScroll - position));
  }

  useScrollPosition(shouldHideCTA, [hideCTA]);

  return hideCTA ? null : (
    <div className="nav-cta w-100 position-fixed" >
      <div className="container p-0">
        <div className="cta-wrapper d-inline-flex flex-column align-items-center">
          <p className="d-inline mb-1 mb-md-3 d-none d-sm-block">Scroll</p>
          <Image width={16} height={16} className="cta-arrow" src={arrowDown} alt="Scroll indicator"/>
        </div>
      </div>
    </div>
  );
}
