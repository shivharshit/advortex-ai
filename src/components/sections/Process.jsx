import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, PenTool, Code2, Rocket, TrendingUp } from 'lucide-react';
import Section from '../ui/Section';
import styles from './Process.module.css';

const steps = [
  { icon: Search, title: "Discover", desc: "We analyze your business processes and identify high-impact AI opportunities." },
  { icon: PenTool, title: "Strategy", desc: "Our experts design a custom AI roadmap tailored to your specific goals." },
  { icon: Code2, title: "Build", desc: "We develop and train your custom AI models and automation workflows." },
  { icon: Rocket, title: "Launch", desc: "Seamless integration into your existing systems with zero downtime." },
  { icon: TrendingUp, title: "Scale", desc: "Continuous optimization and support to ensure maximum ROI." }
];

const Process = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="process" className={styles.processSection}>
      <div className={styles.header}>
        <motion.div 
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          Our <span className="text-gradient">Process</span>
        </motion.h2>
      </div>

      <div className={styles.timelineContainer} ref={containerRef}>
        <div className={styles.lineBackground}></div>
        <motion.div 
          className={styles.lineFill} 
          style={{ height: lineHeight }}
        ></motion.div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div 
              key={index}
              className={styles.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className={styles.contentWrapper}>
                <div className={styles.content}>
                  <div className={styles.stepNumber}>0{index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
              
              <div className={styles.nodeWrapper}>
                <motion.div 
                  className={styles.node}
                  whileInView={{ 
                    backgroundColor: "rgba(0, 229, 255, 1)",
                    boxShadow: "0 0 20px rgba(0, 229, 255, 0.8)",
                    borderColor: "transparent"
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Icon size={20} className={styles.nodeIcon} />
                </motion.div>
              </div>

              <div className={styles.emptySpace}></div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

export default Process;
