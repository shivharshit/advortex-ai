import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, XIcon, LinkedinIcon, YoutubeIcon, FacebookIcon } from '../ui/SocialIcons';
import styles from './Footer.module.css';
import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandInfo}>
          <Logo size="md" />
          <p className={styles.description}>
            We build AI Chatbots, Intelligent Automation Systems, High-Converting Websites, and Digital Marketing Solutions that help businesses scale faster, reduce costs, and generate more leads.
          </p>
          <div className={styles.socialIcons}>
            <a href="https://www.instagram.com/advortexai.in/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><InstagramIcon size={20} /></a>
            <a href="https://x.com/AdVortexAI" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><XIcon size={18} /></a>
            <a href="https://www.linkedin.com/company/advortex-ai/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><LinkedinIcon size={20} /></a>
            <a href="https://www.youtube.com/@advortexailabs" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><YoutubeIcon size={20} /></a>
            <a href="https://www.facebook.com/AdVortexAI" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FacebookIcon size={20} /></a>
          </div>
        </div>
        
        <div className={styles.linksSection}>
          <div className={styles.linkGroup}>
            <h4>Services</h4>
            <Link to="/services?tab=ai-chatbots">AI Chatbots</Link>
            <Link to="/services?tab=business-automation">Business Automation</Link>
            <Link to="/services?tab=website-development">Website Development</Link>
            <Link to="/services?tab=digital-marketing">Digital Marketing</Link>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/portfolio">Case Studies</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/workplace-policy">Workplace Policy</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Legal</h4>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} AdVortex AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
