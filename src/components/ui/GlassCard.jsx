import React from 'react';
import { motion } from 'framer-motion';
import styles from './GlassCard.module.css';

const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div 
      className={`glass-panel ${styles.card} ${className}`}
      whileHover={hover ? { y: -10, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      <div className={styles.glow}></div>
      <div className={styles.content}>
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
