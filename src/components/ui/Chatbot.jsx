import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Headset, User, CheckCircle, Bot } from 'lucide-react';
import styles from './Chatbot.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const handleCtaClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };
  
  // State Machine
  const [step, setStep] = useState(0);
  const [leadData, setLeadData] = useState({});
  const messagesEndRef = useRef(null);

  const inputRef = useRef(null);

  // Auto-open after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpened) {
        setIsOpen(true);
        setHasOpened(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasOpened]);

  // Auto-close after 2 seconds of inactivity
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen, messages, inputValue, isTyping]);

  const currentOptions = messages.length > 0 ? messages[messages.length - 1].options : null;
  const isComplete = step === 10;

  // Auto-focus input field
  useEffect(() => {
    if (isOpen && !isTyping && (!currentOptions || currentOptions.length === 0) && !isComplete) {
      // Small timeout to ensure DOM is ready and animations are done
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isTyping, currentOptions, isComplete]);

  const initialized = useRef(false);

  // Initial Greeting
  useEffect(() => {
    if (!initialized.current && messages.length === 0) {
      initialized.current = true;
      setMessages([
        { sender: 'bot', text: "👋 Hi! I'm Vortex, AdVortex AI's virtual growth assistant. I can help you discover AI solutions, answer questions, and book a free strategy call. How can I help you today?" }
      ]);
      setTimeout(() => {
        setMessages(prev => {
          if (prev.some(m => m.text === "Before we begin, may I know your name?")) return prev;
          return [...prev, { sender: 'bot', text: "Before we begin, may I know your name?" }];
        });
        setStep(1);
      }, 1000);
    }
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const simulateBotResponse = (text, options = null, nextStep) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text, options }]);
      setStep(nextStep);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;
    
    // Email Validation
    if (step === 3 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      setMessages(prev => [...prev, { sender: 'user', text }]);
      simulateBotResponse("Please provide a valid email address.", null, 3);
      setInputValue('');
      return;
    }

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputValue('');

    switch (step) {
      case 1: // Name
        setLeadData(prev => ({ ...prev, name: text }));
        simulateBotResponse("Great! What is the name of your business or company?", null, 2);
        break;
      case 2: // Company
        setLeadData(prev => ({ ...prev, company: text }));
        simulateBotResponse("What's the best email address to send recommendations and follow-up information?", null, 3);
        break;
      case 3: // Email
        setLeadData(prev => ({ ...prev, email: text }));
        simulateBotResponse("What's the best phone or WhatsApp number to reach you?", null, 4);
        break;
      case 4: // Phone
        setLeadData(prev => ({ ...prev, phone: text }));
        simulateBotResponse("What is your business type?", [
          "E-commerce", "Local Business", "Agency", "SaaS", "Consultant", "Coach", "Startup", "Other"
        ], 5);
        break;
      case 5: // Business Type
        setLeadData(prev => ({ ...prev, businessType: text }));
        simulateBotResponse("What is your monthly revenue range?", [
          "Under $1k / ₹80k", "$1k–$5k / ₹80k–₹4L", "$5k–$20k / ₹4L–₹16L", "$20k–$100k / ₹16L–₹80L", "$100k+ / ₹80L+"
        ], 6);
        break;
      case 6: // Revenue
        setLeadData(prev => ({ ...prev, revenue: text }));
        simulateBotResponse("What is your primary goal?", [
          "Generate More Leads", "Automate Operations", "Improve Customer Support", "Build AI Chatbots", "Website Development", "SEO & Marketing", "Custom AI Solutions"
        ], 7);
        break;
      case 7: // Goal
        setLeadData(prev => ({ ...prev, goal: text }));
        simulateBotResponse("What is your project budget?", [
          "Under $500 / ₹40k", "$500–$2k / ₹40k–₹1.6L", "$2k–$5k / ₹1.6L–₹4L", "$5k–$10k / ₹4L–₹8L", "$10k+ / ₹8L+"
        ], 8);
        break;
      case 8: // Budget
        setLeadData(prev => ({ ...prev, budget: text }));
        simulateBotResponse("What is your project timeline?", [
          "ASAP", "Within 30 Days", "Within 90 Days", "Just Exploring"
        ], 9);
        break;
      case 9: // Timeline
        const finalData = { ...leadData, timeline: text, timestamp: new Date().toISOString() };
        
        // Qualification Logic
        let score = "Warm";
        if ((finalData.budget === "$5k–$10k / ₹4L–₹8L" || finalData.budget === "$10k+ / ₹8L+") && 
            (finalData.timeline === "ASAP" || finalData.timeline === "Within 30 Days")) {
          score = "Hot";
        } else if (finalData.timeline === "Just Exploring" || finalData.budget === "Under $500 / ₹40k") {
          score = "Cold";
        }
        finalData.leadScore = score;
        
        setLeadData(finalData);
        
        // Post to Backend CRM API
        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: finalData.name,
            email: finalData.email,
            phone: finalData.phone,
            company: finalData.company,
            service: finalData.goal,
            budget: finalData.budget,
            message: `Lead Score: ${finalData.leadScore}, Timeline: ${finalData.timeline}, Revenue: ${finalData.revenue}, Type: ${finalData.businessType}`
          })
        }).then(res => {
          if (res.ok) console.log("🚀 LEAD CAPTURED SUCESSFULLY via Backend API!");
          else console.error("Failed to capture lead via Backend API");
        }).catch(err => console.error("Error capturing lead:", err));
        
        simulateBotResponse("Thank you! Based on your answers, our team can help you achieve your goals. A strategy specialist will contact you shortly. You can also schedule a free consultation now.", null, 10);
        break;
      default:
        simulateBotResponse("If you have any other questions, feel free to book a call with our team!", null, 10);
        break;
    }
  };



  return (
    <>
      {/* Floating Action Button */}
      <div className={styles.fabContainer}>
        {!isOpen && !hasOpened && (
          <div className={styles.fabTooltip}>
            <button 
              className={styles.closeTooltip} 
              onClick={(e) => { e.stopPropagation(); setHasOpened(true); }}
              aria-label="Close"
              style={{ position: 'absolute', top: '4px', right: '4px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
            <div className={styles.tooltipTitle}>🤖 Chat with Vortex AI Assistant</div>
            <div className={styles.tooltipSub}>Get Instant AI Assistance</div>
          </div>
        )}

        <motion.button 
          className={styles.fab}
          onClick={() => { setIsOpen(!isOpen); setHasOpened(true); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ boxShadow: isOpen ? "0 0 0px var(--color-cyan)" : ["0 0 0px var(--color-cyan)", "0 0 20px var(--color-purple)", "0 0 0px var(--color-cyan)"] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </motion.button>
      </div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className={styles.botAvatar}>
                  <Headset size={20} />
                  <div className={styles.onlineDot}></div>
                </div>
                <div className={styles.headerInfo}>
                  <h3>AdVortex AI</h3>
                  <span>Chat with Vortex AI Assistant</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className={styles.closeChatBtn}
                aria-label="Close Chat"
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.7, padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className={styles.messagesContainer}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.wrapperUser : styles.wrapperBot}`}>
                  {msg.sender === 'bot' && <div className={styles.msgAvatar}><Headset size={14}/></div>}
                  <div className={`${styles.message} ${msg.sender === 'user' ? styles.msgUser : styles.msgBot}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className={`${styles.messageWrapper} ${styles.wrapperBot}`}>
                  <div className={styles.msgAvatar}><Headset size={14}/></div>
                  <div className={`${styles.message} ${styles.msgBot} ${styles.typingIndicator}`}>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              
              {/* Options */}
              {!isTyping && currentOptions && currentOptions.length > 0 && (
                <div className={styles.optionsContainer}>
                  {currentOptions.map((opt, i) => (
                    <button key={i} className={styles.optionBtn} onClick={() => handleSend(opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Final CTAs */}
              {!isTyping && isComplete && (
                <div className={styles.finalCtas}>
                  <button className={styles.ctaPrimary} onClick={() => handleCtaClick('/contact')}>Book Free Consultation</button>
                  <button className={styles.ctaSecondary} onClick={() => handleCtaClick('/services')}>Get Proposal</button>
                  <button className={styles.ctaSecondary} onClick={() => handleCtaClick('/contact')}>Contact Team</button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={styles.inputArea}>
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isTyping || (currentOptions && currentOptions.length > 0) || isComplete}
                className={styles.input}
              />
              <button 
                className={styles.sendBtn}
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping || (currentOptions && currentOptions.length > 0) || isComplete}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
