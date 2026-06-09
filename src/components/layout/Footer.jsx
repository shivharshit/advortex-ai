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
            <Link to="/services/ai-automation">AI Automation Services</Link>
            <Link to="/services/ai-chatbot-development">AI Chatbot Development</Link>
            <Link to="/services/whatsapp-automation">WhatsApp Automation</Link>
            <Link to="/services/business-process-automation">Business Process Automation</Link>
            <Link to="/services/website-development">Website Development</Link>
            <Link to="/services/seo-services">SEO Services</Link>
            <Link to="/services/digital-marketing">Digital Marketing</Link>
            <Link to="/services/social-media-marketing">Social Media Marketing</Link>
            <Link to="/services/lead-generation">Lead Generation Services</Link>
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
            <h4>Connect</h4>
            <a href="https://share.google/6wTbt6lGT5eZOMiY1" target="_blank" rel="noopener noreferrer">Google Business Profile</a>
            <a href="https://www.indiamart.com/company/270068454/" target="_blank" rel="noopener noreferrer">IndiaMART</a>
            <a href="https://www.justdial.com/Balaghat/AdVortex-AI-Near-Durga-Temple-Katangi/9999P7632-7632-260607115547-M1S2_BZDET" target="_blank" rel="noopener noreferrer">Justdial</a>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Contact Info</h4>
            <p><strong>AdVortexAI</strong></p>
            <a 
              href="https://www.google.com/maps/place/Indore,+Madhya+Pradesh,+India/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ lineHeight: '1.6' }}
            >
              Indore, Madhya Pradesh<br/>India
            </a>
            <a href="tel:+919183347948">+91 91833 47948</a>
            <a href="mailto:support@advortex.in">support@advortex.in</a>
          </div>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <div className={`container ${styles.copyrightContainer}`}>
          <p>&copy; {new Date().getFullYear()} AdVortex AI. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
