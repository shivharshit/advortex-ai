import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import Section from '../ui/Section';
import styles from './Results.module.css';

const stats = [
  { value: 500, suffix: "+", label: "Leads Generated", highlight: true },
  { value: 50, suffix: "+", label: "Projects Delivered", highlight: false },
  { value: 95, suffix: "%", label: "Client Satisfaction", highlight: true },
  { value: 2000, suffix: "+", label: "Hours Automated", highlight: false }
];

const Counter = ({ value, suffix, highlight }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      animate(count, value, { duration: 2.5, ease: "easeOut" });
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, count, value]);

  return (
    <div className={styles.valueContainer} ref={ref}>
      <motion.span className={highlight ? 'text-gradient' : ''}>
        {rounded}
      </motion.span>
      <span className={highlight ? 'text-gradient' : ''}>{suffix}</span>
    </div>
  );
};

const Results = () => {
  return (
    <Section id="results" className={styles.resultsSection}>
      <div className={styles.glassWrapper}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className={styles.statCard}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Counter value={stat.value} suffix={stat.suffix} highlight={stat.highlight} />
              <div className={styles.label}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Results;
