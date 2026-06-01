import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton = () => {
  const [showBadge, setShowBadge] = useState(false);
  const [attention, setAttention] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    // Show badge after 20 seconds
    const badgeTimer = setTimeout(() => {
      if (!interacted) setShowBadge(true);
    }, 20000);

    // Trigger attention animation after 30 seconds
    const attentionTimer = setTimeout(() => {
      if (!interacted) setAttention(true);
    }, 30000);

    return () => {
      clearTimeout(badgeTimer);
      clearTimeout(attentionTimer);
    };
  }, [interacted]);

  const handleClick = () => {
    setInteracted(true);
    setShowBadge(false);
    setAttention(false);

    const phoneNumber = "919183347948";
    const message = "Hi AdVortex AI, I'm interested in learning more about your AI automation, chatbot, website development, and digital marketing services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.tooltip}
        initial={{ opacity: 0, x: 20 }}
        whileHover={{ opacity: 1, x: 0 }}
      >
        <div className={styles.tooltipTitle}>💬 Chat with AdVortex AI</div>
        <div className={styles.tooltipSub}>Get a Free AI Growth Consultation</div>
      </motion.div>

      <motion.button
        className={`${styles.waButton} ${attention ? styles.attentionAnim : ''}`}
        onClick={handleClick}
        onHoverStart={() => { setInteracted(true); setShowBadge(false); setAttention(false); }}
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className={styles.glowBg}></div>
        <div className={styles.glassEffect}></div>
        
        {/* SVG WhatsApp Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.waIcon} fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>

        <AnimatePresence>
          {showBadge && (
            <motion.div 
              className={styles.badge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              1
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;
