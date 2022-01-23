import React, { useState, useEffect } from 'react';

export default React.forwardRef(function ShortBio (props, ref) {
  const [visibleTextIndex, setVisibleTextIndex] = useState(0);

  const text = [
    'graphical things',
    'interactive stuff',
    'visual content',
    'user experiences',
    'weird designs',
  ];

  const textInterval = setInterval(() => {
    const nextIndex = visibleTextIndex + 1 === text.length ? 0 : visibleTextIndex + 1;
    setVisibleTextIndex(nextIndex);
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(textInterval);
    }
  });
  
  return (
    <section ref={ref} className="short-bio container h-100 d-flex flex-column justify-content-center">
      <div className="bio-content px-2 ps-sm-5 pe-sm-0">
        <p className="h2 mb-0"> I’m a software engineer</p>
        <p className="h2 mb-0">that loves creating</p>
        <p className="h2 mb-0">{text[visibleTextIndex]}</p>
      </div>
    </section>
  );
});
