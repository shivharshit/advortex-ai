import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Use MotionValues to bypass React state renders completely (Fixes 99% of lag)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the trailing circle
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable completely on touch devices to save performance
    if (window.matchMedia('(pointer: coarse)').matches || !window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName?.toLowerCase() === 'a' ||
        target.tagName?.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList?.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Small dot (Instant tracking) */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: 'var(--color-cyan)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)'
        }}
        animate={{
          scale: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing larger circle (Spring tracking) */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          border: '1.5px solid var(--color-purple)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
          boxShadow: isHovering ? '0 0 15px rgba(168, 85, 247, 0.3)' : 'none',
          mixBlendMode: 'screen',
          willChange: 'transform'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
