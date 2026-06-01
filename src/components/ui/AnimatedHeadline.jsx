import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnimatedHeadline.module.css';

const headlineData = [
  { 
    headline: "Transform Your Business With AI-Powered Growth", 
    sub: "We build AI chatbots, automation systems, websites, and growth engines that help businesses scale faster." 
  },
  { 
    headline: "Automate More. Scale Faster. Grow Smarter.", 
    sub: "Turn repetitive work into intelligent systems powered by AI and automation." 
  },
  { 
    headline: "The Future Of Business Runs On AI", 
    sub: "From lead generation to customer support, we build AI systems that work 24/7." 
  },
  { 
    headline: "Build Smarter Systems. Generate Better Results.", 
    sub: "AI automation, premium websites, and growth strategies designed for modern businesses." 
  },
  { 
    headline: "Your Next Employee Is Artificial Intelligence", 
    sub: "Deploy AI assistants, automate workflows, and unlock scalable business growth." 
  },
  { 
    headline: "From Manual Work To Intelligent Automation", 
    sub: "Save time, reduce costs, and increase productivity with custom AI solutions." 
  },
  { 
    headline: "Where AI Innovation Meets Business Growth", 
    sub: "Helping startups and businesses leverage AI to gain a competitive advantage." 
  },
  { 
    headline: "Stop Working Harder. Start Working Smarter.", 
    sub: "AI-powered automation and digital systems built to accelerate growth." 
  }
];

const highlightWords = ["AI-Powered", "AI", "Growth", "Automation", "Business", "Artificial Intelligence", "Intelligent", "Smarter"];

const renderHighlightedText = (text) => {
  if (!text) return null;
  // Create a regex pattern to match any of the highlight words
  const pattern = new RegExp(`(${highlightWords.join('|')})`, 'gi');
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    if (highlightWords.some(word => word.toLowerCase() === part.toLowerCase())) {
      return <span key={i} className="text-gradient" style={{ textShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}>{part}</span>;
    }
    return part;
  });
};

const AnimatedHeadline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedHeadline, setDisplayedHeadline] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  // Randomize initial headline on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * headlineData.length);
    setCurrentIndex(randomIndex);
  }, []);

  useEffect(() => {
    const currentHeadline = headlineData[currentIndex].headline;
    let timeout;
    
    if (isTyping) {
      if (displayedHeadline.length < currentHeadline.length) {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayedHeadline(currentHeadline.slice(0, displayedHeadline.length + 1));
        }, 50); // Typing speed
      } else {
        // Finished typing, hold for 3 seconds
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    } else {
      if (displayedHeadline.length > 0) {
        // Erasing
        timeout = setTimeout(() => {
          setDisplayedHeadline(currentHeadline.slice(0, displayedHeadline.length - 1));
        }, 20); // Erasing speed
      } else {
        // Finished erasing, move to next
        setCurrentIndex((prev) => (prev + 1) % headlineData.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedHeadline, isTyping, currentIndex]);

  return (
    <div className={styles.container}>
      <motion.h1 
        className={styles.headline}
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {renderHighlightedText(displayedHeadline)}
        <motion.span 
          className={styles.cursor}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.p 
          key={currentIndex}
          className={styles.subhead}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {headlineData[currentIndex].sub}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHeadline;
