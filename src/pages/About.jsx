import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Zap, Shield, TrendingUp } from 'lucide-react';
import { InstagramIcon, XIcon, LinkedinIcon, YoutubeIcon, FacebookIcon } from '../components/ui/SocialIcons';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import styles from './About.module.css';
import { Link } from 'react-router-dom';

const values = [
  { icon: Zap, title: "Innovation", desc: "We continuously explore emerging technologies and AI solutions to deliver future-ready systems." },
  { icon: TrendingUp, title: "Results First", desc: "Every website, automation, chatbot, and marketing campaign is built with measurable business outcomes in mind." },
  { icon: Shield, title: "Transparency", desc: "We believe in honest communication, clear expectations, and long-term partnerships." },
  { icon: Award, title: "Continuous Growth", desc: "Technology evolves every day, and so do we. We are committed to learning, improving, and helping our clients stay ahead." }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <Section className={styles.heroSection}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.pageTitle}
        >
          About <span className="text-gradient">AdVortex AI</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.pageSubtitle}
        >
          Empowering Businesses Through AI, Automation & Digital Growth
        </motion.p>
      </Section>

      {/* Mission Section */}
      <Section className={styles.missionSection}>
        <div className={styles.contentGrid}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.missionText}
          >
            <h2>Turn complex business challenges into <span className="text-gradient">automated growth systems.</span></h2>
            <p>At AdVortex AI, we believe technology should simplify growth, not complicate it.</p>
            <p>We help businesses leverage the power of Artificial Intelligence, Automation, High-Performance Websites, and Digital Marketing to scale faster, reduce manual work, and create better customer experiences.</p>
            <p>Whether you're a startup, consultant, agency, e-commerce brand, or growing business, we design intelligent solutions that save time, generate leads, improve efficiency, and unlock new growth opportunities.</p>
            <p>From AI-powered chatbots and workflow automation to premium websites and performance marketing campaigns, AdVortex AI combines innovation, creativity, and strategy to help businesses stay ahead in a rapidly evolving digital world.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className={styles.visionCard}>
              <h3>Our Vision</h3>
              <p>To become a trusted global AI and automation partner for businesses seeking sustainable growth through innovation, technology, and intelligent systems.</p>
            </GlassCard>
            
            <GlassCard className={styles.differenceCard}>
              <h3>What Makes Us Different</h3>
              <h4 className="text-gradient">Human Strategy + AI Innovation</h4>
              <p>We don't believe AI replaces people. We believe AI empowers people.</p>
              <p>Our approach combines human creativity, business strategy, and advanced AI technologies to create solutions that deliver measurable results.</p>
              <div className={styles.quoteBlock}>
                "How can we help our clients grow smarter and faster?"
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className={styles.valueCard}>
                <value.icon size={32} className={styles.valueIcon} />
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Founder Section */}
      <Section className={styles.founderSection}>
        <h2 className={styles.sectionTitle}>Meet The Founder</h2>
        
        <div className={styles.founderGrid}>
          {/* Founder Image & Highlight Box */}
          <motion.div 
            className={styles.founderSidebar}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.imageWrapper}>
              <motion.div 
                className={styles.imageGlow}
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.img 
                src="/founder.jpg" 
                alt="Harshit Shiv - Founder of AdVortex AI" 
                className={styles.founderImage} 
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            <GlassCard className={styles.highlightBox}>
              <h3 className={styles.founderName}>Harshit Shiv</h3>
              <p className={styles.founderTitle}>Founder & Growth Strategist</p>
              
              <ul className={styles.highlightList}>
                <li><span className={styles.emoji}>🎓</span> MBA in International Business</li>
                <li><span className={styles.emoji}>🤖</span> AI Automation Specialist</li>
                <li><span className={styles.emoji}>📈</span> Digital Marketing Strategist</li>
                <li><span className={styles.emoji}>🌐</span> Website Development Consultant</li>
                <li><span className={styles.emoji}>🚀</span> Lead Generation Expert</li>
                <li><span className={styles.emoji}>📊</span> SEO & Analytics Professional</li>
                <li><span className={styles.emoji}>💡</span> Passionate About Business Growth Through AI</li>
              </ul>
            </GlassCard>
          </motion.div>
          
          {/* Founder Bio */}
          <motion.div 
            className={styles.founderBio}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className={styles.bioIntro}>
              Harshit Shiv is a digital entrepreneur, AI enthusiast, and growth-focused marketer with a passion for helping businesses leverage technology to achieve scalable growth.
            </p>
            <p>
              With a background in International Business and expertise in digital marketing, AI tools, automation systems, content strategy, website development, and customer acquisition, Harshit combines business thinking with modern technology to build practical solutions that deliver real-world impact.
            </p>
            
            <h4 className={styles.skillsTitle}>Expertise & Skills:</h4>
            <div className={styles.skillsGrid}>
              {[
                "AI Automation Systems", "AI Chatbot Development", "Digital Marketing Strategy", 
                "Social Media Growth", "Search Engine Optimization (SEO)", "Lead Generation Systems",
                "Website Development", "Marketing Analytics", "Customer Relationship Management (CRM)",
                "E-Commerce Growth Strategies", "Content Creation & Brand Building"
              ].map((skill, idx) => (
                <div key={idx} className={styles.skillItem}>
                  <CheckCircle2 size={16} className={styles.checkIcon} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.bioFooter}>
              As a digital creator and marketing professional, Harshit understands both the technical and business sides of growth. His goal is to help companies adopt AI confidently and transform their operations into efficient, scalable systems.
            </div>
            
            <div className={styles.connectSection}>
              <h4 className={styles.skillsTitle}>Connect with AdVortex AI:</h4>
              <div className={styles.socialButtons}>
                <a href="https://www.instagram.com/advortexai.in/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}><InstagramIcon size={20} /> Instagram</a>
                <a href="https://x.com/AdVortexAI" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}><XIcon size={18} /> X (Twitter)</a>
                <a href="https://www.linkedin.com/company/advortex-ai/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}><LinkedinIcon size={20} /> LinkedIn</a>
                <a href="https://www.youtube.com/@advortexailabs" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}><YoutubeIcon size={20} /> YouTube</a>
                <a href="https://www.facebook.com/AdVortexAI" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}><FacebookIcon size={20} /> Facebook</a>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className={styles.ctaSection}>
        <GlassCard className={styles.ctaCard}>
          <h2>Let's Build The Future Together</h2>
          <p>
            Whether you're looking to automate workflows, generate more leads, improve customer engagement, or create a stronger digital presence, AdVortex AI is ready to help.
          </p>
          <p className={styles.ctaHighlight}>Let's transform ideas into intelligent systems and turn growth into a predictable process.</p>
          <div className={styles.ctaActions}>
            <Link to="/contact">
              <Button variant="primary">Get a Free Consultation</Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary">Explore Our Services</Button>
            </Link>
          </div>
        </GlassCard>
      </Section>
    </div>
  );
};

export default About;
