import { useLayoutEffect } from 'react';

const isBrowser = typeof window !== `undefined`;

export default function useScrollPosition(effect, deps) {
  const callBack =() => {
    const position = window.scrollY;
    effect({ position });
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', callBack);
    window.addEventListener('resize', callBack);

    return () => {
      window.removeEventListener('scroll', callBack);
      window.removeEventListener('resize', callBack);
    }
  }, deps)
}