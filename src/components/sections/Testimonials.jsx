import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Section from '../ui/Section';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: "AdVortex AI completely transformed how we operate. Their automation systems saved us countless hours, and the AI chatbot doubled our inbound lead conversion rate in just one month.",
    name: "Sarah Jenkins",
    role: "CEO, ScaleUp Tech",
    initials: "SJ"
  },
  {
    quote: "The custom CRM integration and lead generation system they built for us is nothing short of incredible. Our sales team is closing 40% more deals.",
    name: "Michael Chen",
    role: "VP of Sales, GrowthWorks",
    initials: "MC"
  },
  {
    quote: "We hired them to revamp our website with AI capabilities. The result is a stunning, high-performance platform that perfectly captures our premium brand identity.",
    name: "Emma Roberts",
    role: "Founder, Luxe Digital",
    initials: "ER"
  }
];

const Testimonials = () => {
  return (
    <Section id="testimonials" className={styles.testSection}>
      <div className={styles.header}>
        <motion.div 
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Success Stories
        </motion.div>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          What Our <span className="text-gradient">Clients Say</span>
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {testimonials.map((test, index) => (
          <motion.div 
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <div className={styles.quoteIconWrapper}>
              <Quote size={24} className={styles.quoteIcon} />
            </div>
            <p className={styles.text}>"{test.quote}"</p>
            
            <div className={styles.author}>
              <div className={styles.avatar}>
                <span>{test.initials}</span>
              </div>
              <div className={styles.authorInfo}>
                <h4>{test.name}</h4>
                <span>{test.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
