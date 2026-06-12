import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Box, Code, Palette, Video, BarChart, Users } from 'lucide-react';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import styles from './AITools.module.css';
import seedanceLogo from '../assets/seedance.jpg';

const toolsData = [
  {
    category: "AI Models & Assistants",
    icon: Cpu,
    tools: [
      { name: "ChatGPT", domain: "openai.com", desc: "Advanced conversational AI for content creation, research, customer support, and business automation." },
      { name: "Claude", domain: "anthropic.com", desc: "Enterprise-grade AI assistant for strategic thinking, content generation, and workflow optimization." },
      { name: "Gemini", domain: "gemini.google.com", desc: "Google's multimodal AI platform for research, productivity, and business intelligence." },
      { name: "Perplexity", domain: "perplexity.ai", desc: "AI-powered search and research platform for accurate and real-time information." },
      { name: "Qwen", domain: "alibabacloud.com", desc: "Advanced multilingual AI model for reasoning, coding, content generation, and business applications." },
      { name: "DeepSeek", domain: "deepseek.com", desc: "High-performance AI model specializing in reasoning, coding, research, and analytical tasks." }
    ]
  },
  {
    category: "AI Automation Platforms",
    icon: Box,
    tools: [
      { name: "n8n", domain: "n8n.io", desc: "Advanced workflow automation platform for connecting apps, AI, and business systems." },
      { name: "Make", domain: "make.com", desc: "Powerful visual automation platform for creating complex business workflows." },
      { name: "Zapier", domain: "zapier.com", desc: "Automation platform that connects thousands of applications and services." }
    ]
  },
  {
    category: "Website & Development",
    icon: Code,
    tools: [
      { name: "Cursor", domain: "cursor.com", desc: "AI-powered code editor for faster software and website development." },
      { name: "GitHub Copilot", domain: "github.com", desc: "AI coding assistant that accelerates development and productivity." },
      { name: "Vercel", domain: "vercel.com", desc: "Modern platform for deploying high-performance websites and applications." },
      { name: "Antigravity", domain: "react.dev", desc: "AI-powered website builder for creating premium modern SaaS websites with advanced animations and interactions." }
    ]
  },
  {
    category: "AI Design & Creative",
    icon: Palette,
    tools: [
      { name: "Canva AI", domain: "canva.com", desc: "AI-powered graphic design platform for marketing and branding assets." },
      { name: "Midjourney", domain: "midjourney.com", desc: "Advanced AI image generation platform for creative visual content." },
      { name: "Adobe Firefly", domain: "adobe.com", desc: "Generative AI tools for professional design and content creation." },
      { name: "Leonardo AI", domain: "leonardo.ai", desc: "High-quality AI image generation and creative asset production." },
      { name: "Google Flow", domain: "google.com", desc: "Cinematic AI-powered image and video generation platform used for premium marketing visuals and storytelling." }
    ]
  },
  {
    category: "AI Video Creation",
    icon: Video,
    tools: [
      { name: "Runway", domain: "runwayml.com", desc: "Professional AI video editing and content creation platform." },
      { name: "Kling AI", domain: "kuaishou.com", desc: "Advanced AI video generation with realistic motion and visuals." },
      { name: "Pika", domain: "pika.art", desc: "Creative AI video creation and animation platform." },
      { name: "Hailuo AI", domain: "hailuoai.com", desc: "AI-powered video generation platform for cinematic and creative content production." },
      { name: "Higgsfield", domain: "higgsfield.ai", desc: "Advanced AI video generation platform focused on cinematic camera movements and realistic visual storytelling." },
      { name: "Seedance", domain: "seedance.ai", localLogo: seedanceLogo, desc: "Next-generation AI video creation tool for dynamic motion graphics, advertising content, and creative storytelling." }
    ]
  },
  {
    category: "Marketing & Growth",
    icon: BarChart,
    tools: [
      { name: "Meta Ads", domain: "meta.com", desc: "Paid advertising platform for Facebook and Instagram growth campaigns." },
      { name: "Google Ads", domain: "ads.google.com", desc: "Search, display, and performance marketing campaigns." },
      { name: "Google Analytics", domain: "analytics.google.com", desc: "Website traffic, user behavior, and conversion analytics." },
      { name: "SEMrush", domain: "semrush.com", desc: "SEO, keyword research, and competitive intelligence platform." }
    ]
  },
  {
    category: "Productivity",
    icon: Users,
    tools: [
      { name: "Notion", domain: "notion.so", desc: "Knowledge management and team collaboration platform." },
      { name: "Airtable", domain: "airtable.com", desc: "Flexible database and workflow management platform." },
      { name: "Slack", domain: "slack.com", desc: "Team communication and collaboration platform." },
      { name: "Calendly", domain: "calendly.com", desc: "Automated meeting scheduling and appointment booking." }
    ]
  }
];

const TiltCard = ({ tool }) => {
  const [imgSrc, setImgSrc] = useState(tool.localLogo || `https://logo.clearbit.com/${tool.domain}`);
  const [errorLevel, setErrorLevel] = useState(0);
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    if (errorLevel === 0) {
      setImgSrc(`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`);
      setErrorLevel(1);
    } else {
      setErrorLevel(2);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <div 
      ref={cardRef}
      className={styles.tiltCardWrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={styles.glowSpotlight}
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 229, 255, 0.15), transparent 40%)`
        }}
      />
      <div className={styles.toolCardContent}>
        <div className={styles.toolHeader}>
          <div className={styles.logoWrapper}>
            {errorLevel < 2 ? (
              <img 
                src={imgSrc} 
                alt={`${tool.name} Logo`} 
                className={styles.toolLogo}
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <div className={styles.fallbackLogo}>{tool.name.charAt(0)}</div>
            )}
            <div className={styles.logoGlow}></div>
          </div>
          <h3 className={styles.toolName}>{tool.name}</h3>
        </div>
        <p className={styles.toolDesc}>{tool.desc}</p>
      </div>
    </div>
  );
};

const BackgroundParticles = () => {
  return (
    <div className={styles.particlesContainer}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.particle}
          animate={{
            y: ["0vh", "-100vh"],
            x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
            opacity: [0, 0.8, 0],
            scale: [0, Math.random() + 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? 'var(--color-cyan)' : 'var(--color-purple)'
          }}
        />
      ))}
    </div>
  );
};

const FloatingLogo = ({ domain, delay }) => {
  const [imgSrc, setImgSrc] = useState(`https://logo.clearbit.com/${domain}`);
  const [errorLevel, setErrorLevel] = useState(0);

  const handleError = () => {
    if (errorLevel === 0) {
      setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      setErrorLevel(1);
    }
  };

  return (
    <motion.img
      src={imgSrc}
      onError={handleError}
      className={styles.floatingLogo}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 5, -5, 0],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{
        duration: Math.random() * 5 + 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      style={{
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 80 + 10}%`,
        filter: "grayscale(50%) brightness(150%)",
        display: errorLevel > 1 ? 'none' : 'block'
      }}
    />
  );
};

const FloatingLogos = () => {
  const domains = ["openai.com", "anthropic.com", "n8n.io", "zapier.com", "midjourney.com", "meta.com", "google.com", "slack.com"];
  return (
    <div className={styles.floatingLogosContainer}>
      {domains.map((domain, i) => (
        <FloatingLogo key={i} domain={domain} delay={Math.random() * 2} />
      ))}
    </div>
  );
};

const AnimatedCounter = ({ end, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp = null;
    const duration = 2500;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    const timeout = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, 500); 
    
    return () => clearTimeout(timeout);
  }, [end]);

  return <span>{count}{suffix}</span>;
};

const AITools = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", ...toolsData.map(d => d.category)];
  
  const filteredTools = activeCategory === "All" 
    ? toolsData 
    : toolsData.filter(d => d.category === activeCategory);

  return (
    <div className={styles.pageWrapper}>
      <BackgroundParticles />
      <FloatingLogos />
      
      <Section className={styles.headerSection}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.badge}
        >
          <span className={styles.badgeGlow}></span>
          30+ AI & Automation Technologies Integrated
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.pageTitle}
        >
          Built With Industry-Leading <br/>
          <span className="text-gradient">AI Technology</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.pageSubtitle}
        >
          We combine the world's most powerful AI, automation, design, development, and growth platforms to deliver intelligent solutions that help businesses scale faster.
        </motion.p>
      </Section>

      <Section className={styles.counterSection}>
        <div className={styles.counterGrid}>
          <GlassCard className={styles.counterCard}>
            <h3 className="text-gradient">
              <AnimatedCounter end={30} />
            </h3>
            <p>AI Technologies</p>
          </GlassCard>
          <GlassCard className={styles.counterCard}>
            <h3 className="text-gradient">
              <AnimatedCounter end={10} />
            </h3>
            <p>Business Categories Served</p>
          </GlassCard>
          <GlassCard className={styles.counterCard}>
            <h3 className="text-gradient">
              <AnimatedCounter end={100} />
            </h3>
            <p>Automation Possibilities</p>
          </GlassCard>
          <GlassCard className={styles.counterCard}>
            <h3 className="text-gradient">
              24/7
            </h3>
            <p>AI-Powered Operations</p>
          </GlassCard>
        </div>
      </Section>

      <Section className={styles.tabsSection}>
        <div className={styles.tabsWrapper}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.tabBtn} ${activeCategory === cat ? styles.activeTab : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      <Section className={styles.toolsSection}>
        <div className={styles.categoriesContainer}>
          <AnimatePresence mode="popLayout">
            {filteredTools.map((categoryGroup, idx) => {
              const Icon = categoryGroup.icon;
              return (
                <motion.div 
                  key={categoryGroup.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={styles.categoryBlock}
                >
                  <div className={styles.categoryHeader}>
                    <Icon className={styles.categoryIcon} size={28} />
                    <h2 className={styles.categoryTitle}>{categoryGroup.category}</h2>
                  </div>
                  
                  <div className={styles.toolsGrid}>
                    {categoryGroup.tools.map((tool, tIdx) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: tIdx * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                      >
                        <TiltCard tool={tool} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
};

export default AITools;
