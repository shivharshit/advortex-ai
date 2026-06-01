import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage sequence
    // 0: Initial fade in (0-1s)
    // 1: Glow expanding (1s-2.5s)
    // 2: Fully illuminated (2.5s-3.5s)
    // 3: Fade out and trigger onComplete (3.5s+)

    const timer1 = setTimeout(() => setStage(1), 1000);
    const timer2 = setTimeout(() => setStage(2), 2500);
    const timer3 = setTimeout(() => {
      setStage(3);
      setTimeout(onComplete, 800); // Wait for fade out animation before unmounting
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div 
          className={styles.loadingContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Ambient Particles */}
          <div className={styles.particles}>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: stage >= 1 ? [0, 0.5, 0] : 0, 
                  scale: stage >= 1 ? [0, 1.5, 0] : 0,
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 2 
                }}
                style={{
                  background: i % 2 === 0 ? 'var(--color-cyan)' : 'var(--color-purple)'
                }}
              />
            ))}
          </div>

          <div className={styles.logoWrapper}>
            {/* The expanding glow effect */}
            <motion.div 
              className={styles.glow}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: stage >= 1 ? 2 : 0.5,
                opacity: stage >= 1 ? 0.6 : 0
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* The Vortex Image */}
            <motion.img 
              src="/logo.svg" 
              alt="Loading"
              className={styles.vortex}
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={{ 
                opacity: stage >= 2 ? 1 : (stage >= 1 ? 0.8 : (stage >= 0 ? 0.4 : 0)),
                scale: stage >= 2 ? 1.1 : 1,
                rotate: 360 
              }}
              transition={{ 
                opacity: { duration: 1 },
                scale: { duration: 1, ease: "easeOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" } 
              }}
            />
          </div>

          <motion.div 
            className={styles.textWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className={styles.textLogo}>
              AdVortex<span className={styles.textAccent}>AI</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
