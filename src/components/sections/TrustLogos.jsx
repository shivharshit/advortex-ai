import React from 'react';
import { motion } from 'framer-motion';
import styles from './TrustLogos.module.css';
import Section from '../ui/Section';

const logos = [
  "OpenAI", "Claude", "Gemini", "n8n", "Zapier", "Make", "Supabase", "Vercel", "Stripe", "Next.js"
];

const TrustLogos = () => {
  return (
    <Section className={styles.trustSection}>
      <motion.div 
        className={styles.glassContainer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.glowEdge}></div>
        <p className={styles.label}>Powered by the world's leading AI technologies</p>
        
        <div className={styles.logoCloud}>
          <div className={styles.leftGradient}></div>
          <div className={styles.rightGradient}></div>
          
          <div className={styles.logoTrack}>
            {/* Render 3 sets to ensure continuous infinite scroll without snapping empty gaps */}
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <motion.div 
                key={i} 
                className={`${styles.logoItem} hover-target`}
                whileHover={{ 
                  scale: 1.15, 
                  rotateZ: 2,
                  rotateX: 10,
                  y: -5,
                  filter: "drop-shadow(0 0 20px rgba(0, 229, 255, 0.6))"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={styles.logoHologramGlow}></div>
                <span className={styles.logoText}>{logo}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default TrustLogos;
