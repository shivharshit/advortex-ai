import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Globe, TrendingUp, Search, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Button from '../ui/Button';
import TiltCard from '../ui/TiltCard';
import styles from './Services.module.css';

const services = [
  { icon: Bot, title: "AI Chatbots", desc: "Intelligent conversational agents that automate customer support and qualify leads 24/7.", link: "/services?tab=ai-chatbots" },
  { icon: Zap, title: "Business Automation", desc: "Streamline workflows with custom n8n and Zapier automations to save thousands of hours.", link: "/services?tab=business-automation" },
  { icon: Globe, title: "Website Development", desc: "High-converting, performance-optimized web applications built with modern frameworks.", link: "/services?tab=website-development" },
  { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven marketing campaigns powered by AI analytics for maximum ROI.", link: "/services?tab=digital-marketing" },
  { icon: Search, title: "SEO Optimization", desc: "Dominate search rankings with AI-generated content strategies and technical SEO.", link: "/services?tab=seo-services" },
  { icon: Users, title: "Lead Generation", desc: "Automated outbound systems that consistently fill your pipeline with qualified prospects.", link: "/services?tab=lead-generation" }
];

const Services = () => {
  return (
    <Section id="services" className={styles.servicesSection}>
      <div className={styles.header}>
        <motion.div 
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Growth Systems
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          AI-Powered <span className="text-gradient">Solutions</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={styles.subtitle}
        >
          We leverage cutting-edge technology to automate your business, accelerate growth, and leave your competitors behind.
        </motion.p>
      </div>
      
      <div className={styles.grid}>
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.cardWrapper}
              style={{ height: '100%' }}
            >
              <TiltCard className="hover-target">
                <Link to={service.link} className={styles.serviceCard} style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
                  <div className={styles.iconWrapper}>
                    <Icon size={32} className={styles.icon} />
                  </div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.desc}</p>
                  <div className={styles.cardFooter}>
                    <span>Explore Service</span>
                    <ArrowRight size={16} className={styles.arrow} />
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ marginTop: '60px' }}
      >
        <TiltCard glowColor="rgba(168, 85, 247, 0.3)">
          <div className={styles.customCard} style={{ background: 'transparent', border: 'none', margin: 0, boxShadow: 'none' }}>
            <div className={styles.customCardLeft}>
              <h3>Need Something Custom?</h3>
              <p>Every business is unique. Book a free strategy call and receive a tailored AI growth roadmap designed specifically for your goals.</p>
            </div>
            <div className={styles.customCardRight}>
              <div className={styles.customPrice}>
                <span>Starting From:</span>
                <h4>Custom Quote</h4>
              </div>
              <Link to="/contact">
                <Button variant="primary" className="hover-target">Book a Free Consultation</Button>
              </Link>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </Section>
  );
};

export default Services;
