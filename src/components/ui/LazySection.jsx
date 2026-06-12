import React, { useState, useEffect, useRef } from 'react';

const LazySection = ({ children, minHeight = '300px', rootMargin = '800px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight, width: '100%' }}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazySection;
