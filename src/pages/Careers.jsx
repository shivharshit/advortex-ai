import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, PenTool, TrendingUp, MonitorSmartphone, GraduationCap, CheckCircle2, MapPin, Briefcase, Mail } from 'lucide-react';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { LinkedinIcon } from '../components/ui/SocialIcons';
import styles from './Careers.module.css';

const roles = [
  { id: 'dev', icon: Code, title: 'AI & Automation Developers', type: 'Full-time / Remote' },
  { id: 'web', icon: MonitorSmartphone, title: 'Web Developers (Frontend / Full Stack)', type: 'Full-time / Remote' },
  { id: 'design', icon: PenTool, title: 'UI/UX Designers', type: 'Full-time / Remote' },
  { id: 'marketing', icon: TrendingUp, title: 'Digital Marketing Specialists', type: 'Full-time / Remote' },
  { id: 'content', icon: Mail, title: 'Content Creators & Copywriters', type: 'Full-time / Remote' },
  { id: 'seo', icon: TrendingUp, title: 'SEO & Growth Marketers', type: 'Full-time / Remote' },
  { id: 'research', icon: Briefcase, title: 'AI Research & Tool Experts', type: 'Full-time / Remote' }
];

const benefits = [
  "Work on real AI-powered projects",
  "Exposure to modern tools & technologies",
  "Creative freedom to experiment and build",
  "Fast learning environment",
  "Opportunity to work on global projects",
  "Skill growth in AI, automation, and digital systems"
];

const Careers = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    skills: '',
    resumeUrl: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        e.target.value = '';
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeFile({
          filename: file.name,
          content: event.target.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setResumeFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, resumeFile })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', email: '', role: '', skills: '', resumeUrl: '' });
        setResumeFile(null);
        const fileInput = document.getElementById('resumeFileInput');
        if (fileInput) fileInput.value = '';
      } else {
        setSubmitStatus('error');
        console.error(data.error);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Careers at AdVortex AI | Join Our Team</title>
        <meta name="description" content="Join AdVortex AI and build the future of artificial intelligence. We are hiring AI Engineers, Full Stack Developers, and Marketing Specialists." />
        <meta name="keywords" content="AdVortex AI Careers, AI Jobs, Tech Jobs, React Developer Jobs, AI Engineer Jobs, Hiring" />
      </Helmet>
      {/* Background Visuals */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      
      {/* Hero Section */}
      <Section className={styles.heroSection}>
        <motion.div 
          className={styles.hiringBadge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.pulseDot}></span> We're Hiring
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.heroTitle}
        >
          Careers at <span className="text-gradient">AdVortex AI</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.heroSubtitle}
        >
          Build the Future of AI, Automation & Digital Growth
        </motion.p>
      </Section>

      {/* Intro Section */}
      <Section className={styles.introSection}>
        <GlassCard className={styles.introCard}>
          <p className={styles.leadText}>
            At AdVortex AI, we are not just building websites or automation systems. 
            We are building intelligent digital experiences that help businesses grow faster using AI.
          </p>
          <p>
            We are always looking for passionate thinkers, creators, developers, marketers, and innovators who want to shape the future of technology with us. 
            If you love AI, automation, design, or problem-solving — you will feel at home here.
          </p>
        </GlassCard>
      </Section>

      {/* Why Work With Us Section */}
      <Section className={styles.whySection}>
        <div className={styles.whyGrid}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.whyText}
          >
            <h2>Why Work <span className="text-gradient">With Us?</span></h2>
            <p>We believe great work comes from great environments.</p>
            <p className={styles.highlightText}>We don't treat you like an employee.<br/>We treat you like a builder.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.benefitsList}
          >
            {benefits.map((benefit, idx) => (
              <div key={idx} className={styles.benefitItem}>
                <CheckCircle2 className={styles.checkIcon} size={20} />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Roles Section */}
      <Section className={styles.rolesSection}>
        <div className={styles.rolesHeader}>
          <h2>Who We Are <span className="text-gradient">Looking For</span></h2>
          <p>We are looking for people who are passionate about AI, curious, creative thinkers, and comfortable working in a fast-moving startup environment.</p>
        </div>
        
        <h3 className={styles.subTitle}>Roles We May Open</h3>
        <div className={styles.rolesGrid}>
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className={styles.roleCard}>
                <role.icon size={28} className={styles.roleIcon} />
                <h4>{role.title}</h4>
                <div className={styles.roleMeta}>
                  <Briefcase size={14} /> {role.type}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <p className={styles.openApplicationText}>
          Even if there is no open role listed, we still encourage you to reach out!
        </p>
      </Section>

      {/* Internships Section */}
      <Section className={styles.internshipSection}>
        <GlassCard className={styles.internshipCard}>
          <div className={styles.internshipContent}>
            <div className={styles.internshipIconWrapper}>
              <GraduationCap size={40} className={styles.internshipIcon} />
            </div>
            <div className={styles.internshipText}>
              <h2>Internship <span className="text-gradient">Opportunities</span></h2>
              <p>We also offer internships for students and beginners who want to:</p>
              <ul className={styles.internshipList}>
                <li>Learn AI tools and automation systems</li>
                <li>Work on real client projects</li>
                <li>Build a strong portfolio</li>
                <li>Gain industry experience</li>
              </ul>
              <p className={styles.internshipNote}>Internships are performance-based and learning-focused.</p>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* Stay Updated & LinkedIn */}
      <Section className={styles.stayUpdatedSection}>
        <div className={styles.linkedinBox}>
          <div className={styles.linkedinInfo}>
            <h2>Stay <span className="text-gradient">Updated</span></h2>
            <p>We regularly post updates about job openings, internships, AI projects, and company news.</p>
            <p>Follow us on LinkedIn to stay connected and never miss an opportunity.</p>
          </div>
          <a href="https://www.linkedin.com/company/advortex-ai/" target="_blank" rel="noopener noreferrer" className={styles.linkedinButton}>
            <LinkedinIcon size={24} /> Follow AdVortex AI on LinkedIn
          </a>
        </div>
      </Section>

      {/* Application Form */}
      <Section className={styles.applySection} id="apply">
        <GlassCard className={styles.applyCard}>
          <div className={styles.applyHeader}>
            <h2>How To <span className="text-gradient">Apply</span></h2>
            <p>If you believe in AI, automation, and the future of digital systems — AdVortex AI is the place to grow with us. Send us your details below.</p>
          </div>
          
          <form className={styles.applyForm} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Role Interested In *</label>
                <select 
                  name="role" 
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className={styles.inputField}
                >
                  <option value="" disabled>Select a role</option>
                  {roles.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
                  <option value="Internship">Internship</option>
                  <option value="Other">Other / Open Application</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Resume / Portfolio *</label>
                <div className={styles.fileUploadWrapper}>
                  <input 
                    type="file" 
                    id="resumeFileInput"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                  <div className={styles.orDivider}>- OR -</div>
                  <input 
                    type="url" 
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                    placeholder="Provide a Link (e.g. Google Drive, Portfolio)"
                    className={styles.inputField}
                    required={!resumeFile}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Top Skills & Technologies</label>
              <textarea 
                name="skills"
                rows="3"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, ChatGPT Prompting, Make.com, SEO..."
                className={styles.inputField}
              ></textarea>
            </div>
            
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.successMessage}
                >
                  <CheckCircle2 size={20} />
                  Thanks for your interest and applying. We will reach you out soon!
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.errorMessage}
                >
                  Something went wrong. Please try again or email us directly at support@advortex.in.
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button 
              type="submit" 
              variant="primary" 
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending Application...' : 'Submit Application'}
            </Button>
          </form>
          
          <div className={styles.directEmail}>
            <p>Or apply directly via email: <a href="mailto:support@advortex.in">support@advortex.in</a></p>
          </div>
        </GlassCard>
      </Section>
    </div>
  );
};

export default Careers;
