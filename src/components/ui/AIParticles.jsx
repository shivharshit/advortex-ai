import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AIParticles = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
      opacity: 0.4
    }}>
      {/* Floating Particles - Render fewer on mobile */}
      {[...Array(isMobile ? 5 : 15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{
            y: ["0vh", "-100vh"],
            x: Math.random() > 0.5 ? ["0vw", "10vw"] : ["0vw", "-10vw"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          style={{
            position: 'absolute',
            top: `${100 + Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: Math.random() > 0.5 ? 'var(--color-cyan)' : 'var(--color-purple)',
            borderRadius: '50%',
            boxShadow: '0 0 10px currentColor'
          }}
        />
      ))}

      {/* SVG Neural Network Lines (Data streams) - Disabled entirely on mobile to save GPU */}
      {!isMobile && (
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.15 }}>
          <defs>
            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,229,255,0)" />
              <stop offset="50%" stopColor="rgba(0,229,255,1)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0)" />
            </linearGradient>
          </defs>
          {[...Array(4)].map((_, i) => (
            <motion.rect
              key={`stream-${i}`}
              x={`${10 + i * 12}%`}
              y="-20%"
              width="1"
              height="30%"
              fill="url(#streamGrad)"
              animate={{ y: ["-20%", "120%"] }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
};

export default AIParticles;
