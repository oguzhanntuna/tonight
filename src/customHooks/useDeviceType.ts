import { useLayoutEffect, useState } from 'react';

export const useDeviceType = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useLayoutEffect(() => {
    const updateSize = () => {
        setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return windowWidth <= 1024 ? 'mobile' : 'desktop';
}
