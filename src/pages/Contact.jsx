import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Bot, Calendar, CheckCircle2, ChevronDown, Send } from 'lucide-react';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import styles from './Contact.module.css';

const ContactMethod = ({ icon: Icon, title, desc, link, linkText, details, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <GlassCard className={styles.methodCard}>
      <div className={styles.methodIconWrapper}>
        <Icon className={styles.methodIcon} size={24} />
        <div className={styles.iconGlow}></div>
      </div>
      <div className={styles.methodContent}>
        <h3>{title}</h3>
        <p className={styles.methodDesc}>{desc}</p>
        
        {details && (
          <div className={styles.methodDetails}>
            {details.map((detail, idx) => (
              <p key={idx}>{detail}</p>
            ))}
          </div>
        )}
        
        {link && (
          <a href={link} className={styles.methodLink}>
            {linkText} <span className={styles.linkArrow}>→</span>
          </a>
        )}
      </div>
    </GlassCard>
  </motion.div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.faqHeader}>
        <h4>{question}</h4>
        <ChevronDown className={styles.faqIcon} size={20} />
      </div>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className={styles.faqAnswerWrapper}
      >
        <p className={styles.faqAnswer}>{answer}</p>
      </motion.div>
    </div>
  );
};

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, setFormState] = useState({
    name: '', email: '', company: '', phone: '', website: '', type: '', service: '', budget: '', timeline: '', details: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formState.name,
          email: formState.email,
          phone: formState.phone,
          company: formState.company,
          service: formState.service,
          budget: formState.budget,
          message: formState.details
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', company: '', phone: '', website: '', type: '', service: '', budget: '', timeline: '', details: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage("Failed to send message. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage("An error occurred. Please check your connection and try again.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* Background Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            animate={{
              y: ["0vh", "-100vh"],
              x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
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

      {/* Hero Section */}
      <Section className={styles.heroSection}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.pageTitle}
        >
          Let's Build Something <br />
          <span className="text-gradient">Extraordinary Together</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.pageSubtitle}
        >
          Whether you're looking to automate your business, generate more leads, launch an AI-powered website, or explore custom AI solutions, we're here to help.
        </motion.p>
      </Section>

      <Section className={styles.mainGridSection}>
        <div className={styles.mainGrid}>
          
          {/* Left Column - Contact Methods */}
          <div className={styles.contactMethods}>
            <h2 className={styles.columnTitle}>Get In Touch</h2>
            
            <ContactMethod 
              icon={Mail}
              title="Email Us"
              desc="For business inquiries, partnerships, and project discussions."
              link="mailto:support@advortex.in"
              linkText="support@advortex.in"
              details={["Response Time: Within 24 Hours"]}
              delay={0.1}
            />

            <ContactMethod 
              icon={MessageSquare}
              title="WhatsApp Support"
              desc="Need a quick conversation? Connect directly with our team on WhatsApp."
              link="https://wa.me/919183347948"
              linkText="Chat on WhatsApp"
              details={["+91 9183347948", "Monday – Saturday (09:00 AM – 08:00 PM IST)"]}
              delay={0.2}
            />

            <ContactMethod 
              icon={Bot}
              title="Talk To Vortex AI"
              desc="Need immediate assistance? Chat with Vortex, our AI-powered growth assistant."
              details={[
                "• Learn about our services",
                "• Get project recommendations",
                "• Book a strategy call",
                "• Available 24/7"
              ]}
              delay={0.3}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={styles.strategyCardWrapper}
            >
              <GlassCard className={styles.strategyCard}>
                <div className={styles.strategyHeader}>
                  <Calendar className={styles.strategyIcon} />
                  <h3>Book A Free Strategy Call</h3>
                </div>
                <p>Schedule a personalized consultation and discover how AI can transform your business.</p>
                
                <div className={styles.strategyList}>
                  {["Your business goals", "Current challenges", "Growth opportunities", "AI implementation possibilities", "Automation recommendations", "Custom solution roadmap"].map((item, i) => (
                    <div key={i} className={styles.strategyItem}>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.noPressure}>No obligations. No pressure. Just actionable insights.</div>
                
                <Button variant="primary" className={styles.strategyBtn}>
                  Book Free Consultation
                </Button>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className={styles.formCard}>
              <h2 className={styles.formTitle}>Tell Us About Your Project</h2>
              
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={styles.successMessageBlock}
                  >
                    <div className={styles.successIconWrapper}>
                      <CheckCircle2 size={48} className={styles.successIcon} />
                      <div className={styles.successGlow}></div>
                    </div>
                    <h3>Growth Strategy Request Received!</h3>
                    <p>Thank you for reaching out to AdVortex AI.</p>
                    <p>We've successfully received your project details and a confirmation email is on its way to your inbox.</p>
                    <p className={styles.successNote}>Our team will review your requirements and contact you shortly to schedule your free consultation.</p>
                    <Button variant="secondary" onClick={() => setSubmitStatus('idle')} className={styles.newRequestBtn}>
                      Submit Another Request
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.contactForm} 
                    onSubmit={handleSubmit}
                  >
                    
                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                        <label>Full Name *</label>
                        <input type="text" name="name" required placeholder="John Doe" value={formState.name} onChange={handleChange} />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Business / Company Name</label>
                        <input type="text" name="company" placeholder="Acme Corp" value={formState.company} onChange={handleChange} />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                        <label>Email Address *</label>
                        <input type="email" name="email" required placeholder="john@example.com" value={formState.email} onChange={handleChange} />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Phone Number</label>
                        <input type="tel" name="phone" placeholder="+1 234 567 8900" value={formState.phone} onChange={handleChange} />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                        <label>Website URL</label>
                        <input type="url" name="website" placeholder="https://example.com" value={formState.website} onChange={handleChange} />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Business Type</label>
                        <input type="text" name="type" placeholder="e.g. E-Commerce, Agency" value={formState.type} onChange={handleChange} />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Select Service *</label>
                      <select name="service" required value={formState.service} onChange={handleChange}>
                        <option value="" disabled>Choose a service</option>
                        <option value="AI Chatbots">AI Chatbots</option>
                        <option value="AI Automation">AI Automation</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="SEO Optimization">SEO Optimization</option>
                        <option value="Lead Generation">Lead Generation</option>
                        <option value="Custom AI Solution">Custom AI Solution</option>
                      </select>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                        <label>Project Budget</label>
                        <select name="budget" value={formState.budget} onChange={handleChange}>
                          <option value="" disabled>Select budget range</option>
                          <option value="Under ₹25,000">Under ₹25,000</option>
                          <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                          <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                          <option value="₹1,00,000 – ₹5,00,000">₹1,00,000 – ₹5,00,000</option>
                          <option value="₹5,00,000+">₹5,00,000+</option>
                        </select>
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Project Timeline</label>
                        <select name="timeline" value={formState.timeline} onChange={handleChange}>
                          <option value="" disabled>Select timeline</option>
                          <option value="ASAP">ASAP</option>
                          <option value="Within 30 Days">Within 30 Days</option>
                          <option value="Within 90 Days">Within 90 Days</option>
                          <option value="Just Exploring">Just Exploring</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Project Details *</label>
                      <textarea 
                        name="details" 
                        required 
                        rows="5" 
                        placeholder="Tell us about your goals and requirements..."
                        value={formState.details}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {submitStatus === 'error' && (
                      <div className={styles.errorMessage}>{errorMessage}</div>
                    )}

                    <button type="submit" className={styles.submitBtn} disabled={submitStatus === 'loading'}>
                      <span>{submitStatus === 'loading' ? 'Sending Request...' : 'Get My Free Growth Strategy'}</span>
                      <Send size={18} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </Section>

      {/* Why Choose Us Section */}
      <Section className={styles.whySection}>
        <h2 className={styles.sectionTitle}>Why Businesses Choose AdVortex AI</h2>
        <div className={styles.whyGrid}>
          {[
            "AI-First Approach", "Custom Growth Strategies", "Automation Experts", "Premium Website Development",
            "Performance Marketing Solutions", "Transparent Communication", "Scalable Systems", "Long-Term Partnership Focus"
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={styles.whyItem}
            >
              <div className={styles.whyIconWrapper}>
                <CheckCircle2 size={24} className={styles.whyIcon} />
                <div className={styles.whyGlow}></div>
              </div>
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Frequently Asked Before Contacting Us</h2>
        <div className={styles.faqContainer}>
          <FaqItem 
            question="How quickly can we start?"
            answer="Most projects can begin within 3–7 business days after discovery and planning."
          />
          <FaqItem 
            question="Do you work with startups and small businesses?"
            answer="Yes. We work with startups, local businesses, agencies, consultants, coaches, and growing enterprises."
          />
          <FaqItem 
            question="Can you integrate AI into our existing systems?"
            answer="Absolutely. We specialize in integrating AI solutions into existing workflows and business processes."
          />
          <FaqItem 
            question="Do you offer ongoing support?"
            answer="Yes. We provide ongoing support, maintenance, optimization, and growth consultation."
          />
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className={styles.finalCtaSection}>
        <div className={styles.ctaBackground}></div>
        <GlassCard className={styles.ctaCard}>
          <h2>Ready To Scale With <span className="text-gradient">AI?</span></h2>
          <p>Let's build intelligent systems that save time, generate more leads, and help your business grow faster.</p>
          
          <div className={styles.ctaActions}>
            <Button variant="primary" className={styles.pulseBtn}>Book Free Strategy Call</Button>
            <a href="https://wa.me/919183347948" target="_blank" rel="noreferrer">
              <Button variant="secondary">Chat On WhatsApp</Button>
            </a>
          </div>
          
          <div className={styles.trustMessage}>
            Join forward-thinking businesses using AI to automate, optimize, and accelerate growth.
          </div>
        </GlassCard>
      </Section>

    </div>
  );
};

export default Contact;
