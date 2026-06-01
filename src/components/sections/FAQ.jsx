import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Section from '../ui/Section';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: "How long does it take to deploy an AI Chatbot?",
    a: "Depending on the complexity, our AI Chatbots can be trained and deployed within 2 to 4 weeks. We ensure it perfectly aligns with your brand voice and data."
  },
  {
    q: "Will AI replace my current team?",
    a: "No. AI is designed to augment your team, not replace them. It handles repetitive tasks, freeing your team to focus on strategic, high-value work."
  },
  {
    q: "What platforms do you integrate with?",
    a: "We integrate with almost any modern SaaS platform including Salesforce, HubSpot, Stripe, Shopify, Slack, and custom APIs using tools like n8n and Zapier."
  },
  {
    q: "Do I need technical knowledge to manage the automations?",
    a: "Not at all. We build the systems to run seamlessly in the background. We provide you with simple dashboards to monitor performance."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Section id="faq" className={styles.faqSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Frequently Asked <span className="text-gradient">Questions</span></h2>
      </div>

      <div className={styles.accordionContainer}>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
          >
            <button 
              className={styles.question} 
              onClick={() => toggle(index)}
            >
              <span>{faq.q}</span>
              <motion.div 
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className={styles.icon} />
              </motion.div>
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={styles.answerWrapper}
                >
                  <div className={styles.answer}>
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default FAQ;
