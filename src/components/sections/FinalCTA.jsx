import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Section from '../ui/Section';
import styles from './FinalCTA.module.css';

const FinalCTA = () => {
  return (
    <Section className={styles.ctaSection}>
      <motion.div 
        className={styles.glassPanel}
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.particleBg}>
          {[...Array(15)].map((_, i) => (
            <div key={i} className={styles.particle} style={{
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--duration': `${10 + Math.random() * 10}s`,
              '--delay': `${Math.random() * 5}s`
            }}></div>
          ))}
        </div>

        <div className={styles.content}>
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Start Your Journey
          </motion.div>
          <h2 className={styles.title}>Ready To Scale <span className="text-gradient">With AI?</span></h2>
          <p className={styles.subtitle}>
            Stop wasting hours on manual tasks. Book a free strategy call today and discover how we can transform your business with intelligent automation.
          </p>
          <div className={styles.actions}>
            <Link to="/contact">
              <Button variant="primary" className={styles.btn}>
                Book Your Free Strategy Call
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default FinalCTA;
