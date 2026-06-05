import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/sections/Hero';
import TrustLogos from '../components/sections/TrustLogos';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import Results from '../components/sections/Results';
import CaseStudies from '../components/sections/CaseStudies';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import FinalCTA from '../components/sections/FinalCTA';
import AIParticles from '../components/ui/AIParticles';
import heroVideo from '../assets/hero-video.mp4';
import heroPoster from '../assets/hero.png';
import styles from './Home.module.css';

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.homeContainer} ref={containerRef}>
      <Helmet>
        <title>AdVortex AI | AI Powered Digital Marketing Agency</title>
        <meta name="description" content="AdVortex AI builds highly intelligent chatbots, automated CRM systems, and high-converting marketing solutions. Scale your business and generate leads on autopilot." />
        <meta name="keywords" content="AdVortex, AdVortexAI, Ad Vortex, Ad Vortex AI, AdVortex Agency, AI Automation Agency, Custom AI Chatbots, Marketing Automation, Web Development, Workflow Automation, ChatGPT Integration, Zapier Expert, Make.com Expert, Lead Generation Agency, AI Business Solutions, Enterprise AI Solutions, Automated Customer Support, AI Assistants, SEO Services, Digital Marketing, E-commerce Automation, B2B Lead Generation" />
      </Helmet>

      {/* Layer 1 & 2: Video and Gradient Overlay */}
      <div className={styles.videoBackground}>
        <video 
          src={heroVideo} 
          poster={heroPoster}
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.videoElement}
        />
        <div className={styles.videoOverlay} />
      </div>

      {/* Layer 4: Content */}
      <div className={styles.contentLayer}>
        <Hero />
        
        {/* Wrap the rest of the sections in a cinematic glassmorphism container */}
        <div className={styles.cinematicSection}>
          <AIParticles />
          <TrustLogos />
          <Services />
          <Process />
          <Results />
          <CaseStudies />
          <Testimonials />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </div>
      </div>
    </div>
  );
};

export default Home;
