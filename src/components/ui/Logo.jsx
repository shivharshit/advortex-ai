import React from 'react';
import { motion } from 'framer-motion';
import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = ({ className = '', showText = true, size = 'md' }) => {
  return (
    <Link to="/" className={`${styles.logoContainer} ${styles[size]} ${className}`}>
      <div className={styles.vortexWrapper}>
        <motion.div
          className={styles.glowEffect}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <img 
          src="/logo.svg" 
          alt="AdVortex AI Logo" 
          className={`${styles.vortexImage} ${styles.spinAnimation}`}
        />
      </div>
      {showText && (
        <span className={styles.logoText}>
          AdVortex<span className={styles.logoAccent}>AI</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
