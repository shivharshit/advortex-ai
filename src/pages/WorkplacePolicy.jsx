import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe2, 
  Target, 
  ShieldCheck, 
  HeartHandshake, 
  Laptop, 
  MessageSquare, 
  Clock, 
  Users 
} from 'lucide-react';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import styles from './WorkplacePolicy.module.css';

const WorkplacePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const principles = [
    {
      icon: <Globe2 size={24} />,
      title: "Flexible Work Environment",
      desc: "Work from anywhere. We care about the value you deliver, not your physical location."
    },
    {
      icon: <Target size={24} />,
      title: "Results-Oriented Culture",
      desc: "Our performance is measured by outcomes and impact, rather than hours spent at a desk."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Trust & Accountability",
      desc: "We hire smart people and trust them to manage their time and responsibilities effectively."
    },
    {
      icon: <HeartHandshake size={24} />,
      title: "Global Collaboration",
      desc: "Our distributed team operates seamlessly across borders to serve clients worldwide."
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Remote-First Workplace Policy | AdVortexAI</title>
        <meta name="description" content="Discover AdVortexAI's modern, remote-first workplace policy. We empower our team to work flexibly while delivering exceptional results globally." />
        <link rel="canonical" href="https://advortex.in/workplace-policy" />
      </Helmet>

      {/* Hero Section */}
      <Section className={styles.heroSection}>
        <motion.div 
          className={styles.heroContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badge}>AdVortexAI Culture</div>
          <h1 className={styles.heroTitle}>Remote-First<br /><span className={styles.highlightText}>Workplace Policy</span></h1>
          <p className={styles.heroSubtitle}>
            Empowering our team to work from anywhere while delivering exceptional results for clients worldwide.
          </p>
        </motion.div>
      </Section>

      {/* Introduction */}
      <Section className={styles.contentSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.introBlock}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Our Foundation</h2>
            <p>
              AdVortexAI is proudly a <strong>remote-first</strong> company. We embrace flexibility, accountability, collaboration, and digital innovation. By removing geographical barriers, we build a dynamic team capable of delivering world-class AI Automation, Digital Marketing, and Website Development services without being tied to a traditional office.
            </p>
          </motion.div>

          {/* Philosophy Grid */}
          <div className={styles.gridSection}>
            <h2 className={styles.sectionTitle}>Our Remote Work Philosophy</h2>
            <div className={styles.principlesGrid}>
              {principles.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className={styles.principleCard}>
                    <div className={styles.iconWrapper}>{p.icon}</div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed Policies */}
          <div className={styles.policyDetails}>
            <motion.div className={styles.policyRow} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className={styles.policyIcon}><MessageSquare /></div>
              <div className={styles.policyText}>
                <h3>Communication & Collaboration</h3>
                <p>We leverage cutting-edge digital tools for team communication, project management, client meetings, and knowledge sharing. Clear communication, radical transparency, and timely responsiveness are our core expectations to keep our global engine running smoothly.</p>
              </div>
            </motion.div>

            <motion.div className={styles.policyRow} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className={styles.policyIcon}><Clock /></div>
              <div className={styles.policyText}>
                <h3>Work Hours & Flexibility</h3>
                <p>We champion flexible schedules and respect work-life balance. We focus on outcomes rather than fixed hours, provided that team members remain available during agreed collaboration windows to ensure project momentum.</p>
              </div>
            </motion.div>

            <motion.div className={styles.policyRow} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className={styles.policyIcon}><Laptop /></div>
              <div className={styles.policyText}>
                <h3>Technology & Security</h3>
                <p>Security is paramount. We mandate secure access to company resources, strict protection of client information, responsible use of company systems, and adherence to our data privacy and cybersecurity best practices.</p>
              </div>
            </motion.div>

            <motion.div className={styles.policyRow} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className={styles.policyIcon}><Users /></div>
              <div className={styles.policyText}>
                <h3>Employee Well-Being & Equality</h3>
                <p>AdVortexAI is committed to providing equal opportunities and fostering a diverse, inclusive workplace. We support healthy work-life integration, provide professional development opportunities, and maintain a highly supportive team culture.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <Section className={styles.ctaSection}>
        <motion.div 
          className={styles.ctaCard}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Building the Future of Work</h2>
          <p>
            At AdVortexAI, we believe great work can happen from anywhere. Our remote-first approach enables us to attract top talent, serve clients globally, and create an environment where innovation thrives.
          </p>
          <Link to="/careers" style={{textDecoration: 'none'}}>
            <Button variant="primary" size="lg" className={styles.ctaBtn}>
              Explore Opportunities
            </Button>
          </Link>
        </motion.div>
      </Section>
    </div>
  );
};

export default WorkplacePolicy;
