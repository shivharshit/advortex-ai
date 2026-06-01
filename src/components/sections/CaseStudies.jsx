import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import styles from './CaseStudies.module.css';

const cases = [
  { company: "TechFlow", result: "300% Increase in Qualified Leads", desc: "Implemented a multi-channel AI chatbot that qualified and routed leads 24/7, resulting in a massive pipeline boost." },
  { company: "GlobalRetail", result: "Saved 2,500 Hours/Month", desc: "Automated their entire supply chain reporting and inventory management using custom n8n workflows." }
];

const CaseStudies = () => {
  return (
    <Section id="casestudies" className={styles.caseSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Proven <span className="text-gradient">Results</span></h2>
      </div>
      <div className={styles.grid}>
        {cases.map((c, i) => (
          <motion.div 
            key={i} 
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className={styles.cardBg}></div>
            <div className={styles.content}>
              <div className={styles.company}>{c.company}</div>
              <h3>{c.result}</h3>
              <p>{c.desc}</p>
              <a href="#" className={styles.link}>
                Read full case study <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default CaseStudies;
