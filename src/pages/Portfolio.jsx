import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Quote, 
  ArrowRight, 
  Bot, 
  Zap, 
  Globe, 
  LineChart, 
  Users, 
  ShieldCheck, 
  MessageSquare,
  Workflow,
  Layout,
  PenTool,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import TiltCard from '../components/ui/TiltCard';
import styles from './Portfolio.module.css';

import advortexDash from '../assets/advortex_dash.png';
import premiumWeb from '../assets/premium_web.png';
import n8nWorkflow from '../assets/n8n_workflow.png';
import contentPipeline from '../assets/content_pipeline.png';
import founderImg from '../assets/founder.jpg';

// --- Data ---
const projects = [
  {
    id: "advortex-site",
    title: "AdVortex AI Website",
    category: "AI Agency Website & Brand Experience",
    desc: "The AdVortex AI website was designed as a modern digital experience that combines premium design, intelligent automation, and conversion-focused user journeys. Create a website that instantly communicates innovation, professionalism, and trust while generating qualified leads.",
    highlights: [
      "Animated SaaS-style interface",
      "AI-powered Vortex chatbot",
      "Dynamic user interactions",
      "Lead generation optimization",
      "Mobile-first experience",
      "Modern UI/UX architecture"
    ],
    techStack: ["Antigravity", "ChatGPT", "Claude", "Gemini", "Google Flow", "Cursor"],
    mockupType: "dashboard",
    mockupImage: advortexDash
  },
  {
    id: "vortex-assistant",
    title: "Vortex AI Assistant",
    category: "Intelligent Lead Generation System",
    desc: "Vortex was created as an AI-powered virtual assistant designed to engage visitors, answer questions, qualify leads, and schedule consultations. Unlike traditional contact forms, Vortex creates real conversations that help businesses understand their visitors better.",
    highlights: [
      "Lead Qualification",
      "Contact Collection",
      "Smart Recommendations",
      "Appointment Scheduling",
      "CRM Integration Ready",
      "24/7 Availability"
    ],
    techStack: ["OpenAI", "LangChain", "React", "Node.js"],
    mockupType: "chat"
  },
  {
    id: "ai-workflows",
    title: "AI Automation Workflows",
    category: "Workflow Automation & Business Systems",
    desc: "Modern businesses lose valuable time on repetitive tasks. Our automation systems connect multiple platforms together and eliminate manual work through intelligent workflows.",
    highlights: [
      "Lead Routing",
      "CRM Updates",
      "Email Follow-Ups",
      "Form Processing",
      "Team Notifications",
      "Reporting Systems"
    ],
    techStack: ["n8n", "Make", "Zapier", "Google Workspace", "Airtable"],
    mockupType: "nodes",
    mockupImage: n8nWorkflow
  },
  {
    id: "premium-websites",
    title: "Premium Business Website Projects",
    category: "Conversion-Focused Web Experiences",
    desc: "We design websites that do more than look good. Every page is structured around user experience, trust building, and conversion optimization.",
    highlights: [
      "Fast Loading",
      "Responsive Design",
      "SEO Optimization",
      "Lead Generation Forms",
      "AI Integrations",
      "Modern Animations"
    ],
    techStack: ["React", "Vite", "Framer Motion", "TailwindCSS"],
    mockupType: "dashboard",
    mockupImage: premiumWeb
  },
  {
    id: "ai-content",
    title: "AI Content & Marketing Systems",
    category: "Content Creation & Growth Infrastructure",
    desc: "Creating consistent content can be difficult. Using AI-assisted workflows, businesses can create content faster while maintaining quality and brand consistency.",
    highlights: [
      "Content Planning",
      "Social Media Assets",
      "Blog Content",
      "AI Graphics",
      "Marketing Workflows",
      "Growth Systems"
    ],
    techStack: ["Midjourney", "Claude 3", "Canva", "Notion"],
    mockupType: "nodes",
    mockupImage: contentPipeline
  }
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "Understanding the business, goals, challenges, and opportunities." },
  { num: "02", title: "Strategy", desc: "Designing the right combination of AI, automation, marketing, and technology." },
  { num: "03", title: "Build", desc: "Developing systems, websites, automations, and customer experiences." },
  { num: "04", title: "Optimize", desc: "Testing, refining, and improving performance." },
  { num: "05", title: "Scale", desc: "Creating systems that continue to support long-term business growth." }
];

const whyReasons = [
  { icon: ShieldCheck, title: "Useful", desc: "We focus on solutions that solve actual business problems, not just flashy tech." },
  { icon: LineChart, title: "Scalable", desc: "Systems designed to grow seamlessly as your business expands." },
  { icon: Users, title: "User-Friendly", desc: "Interfaces built for humans, ensuring high adoption and satisfaction." },
  { icon: Zap, title: "Conversion Focused", desc: "Every design decision is engineered to drive leads and sales." },
  { icon: Globe, title: "Future Ready", desc: "Built on adaptable tech stacks that evolve with the digital landscape." },
  { icon: TrendingUp, title: "Growth Driven", desc: "Our ultimate metric for success is your business growth and ROI." }
];

// --- Mockups ---

const DashboardMockup = ({ image }) => (
  <div className={styles.dashWindow}>
    <div className={styles.dashHeader}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
    {image ? (
      <div className={styles.dashImageContainer}>
        <img src={image} alt="Dashboard Screenshot" className={styles.dashImage} />
      </div>
    ) : (
      <div className={styles.dashBody}>
        <div className={styles.dashSidebar}>
          <div className={styles.dashLine} style={{ width: '80%' }} />
          <div className={styles.dashLine} style={{ width: '60%' }} />
          <div className={styles.dashLine} style={{ width: '70%' }} />
          <div className={styles.dashLine} style={{ width: '50%', marginTop: '20px' }} />
        </div>
        <div className={styles.dashMain}>
          <div className={styles.dashHero} />
          <div className={styles.dashGrid}>
            <div className={styles.dashCard} />
            <div className={styles.dashCard} />
          </div>
        </div>
      </div>
    )}
  </div>
);

const ChatMockup = () => (
  <div className={styles.chatWindow}>
    <div className={styles.chatHeader}>
      <div className={styles.chatAvatar}><Bot size={20} /></div>
      <div>
        <div className={styles.chatTitle}>Vortex AI</div>
        <div className={styles.chatStatus}>Online</div>
      </div>
    </div>
    <div className={styles.chatBody}>
      <div className={`${styles.chatBubble} ${styles.chatBot}`}>Hello! How can I help you grow your business today?</div>
      <div className={`${styles.chatBubble} ${styles.chatUser}`}>I need a new AI-powered website.</div>
      <div className={`${styles.chatBubble} ${styles.chatBot}`}>Great! Let's schedule a free strategy call to discuss your goals.</div>
    </div>
    <div className={styles.chatInput}>
      <div className={styles.inputLine} />
      <MessageSquare size={20} color="rgba(255,255,255,0.5)" />
    </div>
  </div>
);

const NodesMockup = ({ image }) => (
  <div className={styles.nodesWindow}>
    {image ? (
      <div className={styles.dashImageContainer}>
        <img src={image} alt="Workflow Screenshot" className={styles.dashImage} />
      </div>
    ) : (
      <>
        <div className={styles.nodeBox} style={{ top: '20%', left: '10%' }}>
          <div className={styles.nodeIcon}><Layout size={18} /></div> Webhook
        </div>
        <div className={styles.nodeLine} style={{ top: '30%', left: '30%', width: '100px', transform: 'rotate(20deg)' }} />
        <div className={styles.nodeBox} style={{ top: '40%', left: '40%' }}>
          <div className={styles.nodeIcon}><Bot size={18} /></div> AI Processing
        </div>
        <div className={styles.nodeLine} style={{ top: '50%', left: '60%', width: '100px', transform: 'rotate(-15deg)' }} />
        <div className={styles.nodeBox} style={{ top: '20%', left: '70%' }}>
          <div className={styles.nodeIcon}><Users size={18} /></div> CRM Update
        </div>
      </>
    )}
  </div>
);

const MockupVisualizer = ({ type, image }) => {
  return (
    <div className={styles.visualWrapper}>
      <div className={styles.mockupGlow} />
      <div className={styles.mockupInner}>
        {type === 'dashboard' && <DashboardMockup image={image} />}
        {type === 'chat' && <ChatMockup />}
        {type === 'nodes' && <NodesMockup image={image} />}
      </div>
    </div>
  );
};

// --- Main Components ---

const PortfolioHero = () => (
  <section className={styles.heroSection}>
    <div className={styles.heroContent}>
      <motion.div 
        className={styles.badge}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Portfolio
      </motion.div>
      <motion.h1 
        className={styles.heroTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Building Intelligent Systems That Drive <span className="text-gradient">Real Business Growth</span>
      </motion.h1>
      <motion.p 
        className={styles.heroDesc}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Every business faces unique challenges. Some struggle to generate leads. Others waste countless hours on repetitive tasks. Below is a showcase of projects, concepts, and solutions that demonstrate our approach to building smarter businesses.
      </motion.p>
    </div>
  </section>
);

const FeaturedWork = () => (
  <Section className={styles.workSection}>
    <div className={styles.sectionHeader}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured Work
      </motion.h2>
    </div>
    
    <div className={styles.projectsContainer}>
      {projects.map((proj, idx) => (
        <motion.div 
          key={proj.id}
          className={`${styles.projectRow} ${idx % 2 !== 0 ? styles.reverse : ''}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.projectContent}>
            <div className={styles.projectCategory}>{proj.category}</div>
            <h3 className={styles.projectTitle}>{proj.title}</h3>
            <p className={styles.projectDesc}>{proj.desc}</p>
            
            <ul className={styles.highlightsList}>
              {proj.highlights.map((h, i) => (
                <li key={i} className={styles.highlightItem}>
                  <Check size={18} className={styles.highlightIcon} /> {h}
                </li>
              ))}
            </ul>
            
            <div className={styles.techStack}>
              {proj.techStack.map((tech, i) => (
                <span key={i} className={styles.techBadge}>{tech}</span>
              ))}
            </div>
          </div>
          
          <div className={styles.projectVisual}>
            <TiltCard glowColor="rgba(0, 229, 255, 0.3)">
              <MockupVisualizer type={proj.mockupType} image={proj.mockupImage} />
            </TiltCard>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

const ProcessTimeline = () => (
  <section className={styles.processSection}>
    <Section>
      <div className={styles.sectionHeader} style={{ marginBottom: '60px' }}>
        <h2 className={styles.sectionTitle}>How We Approach Every Project</h2>
      </div>
      
      <div className={styles.timeline}>
        {processSteps.map((step, idx) => (
          <motion.div 
            key={idx}
            className={styles.timelineStep}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className={styles.stepNumber}>{step.num}</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  </section>
);

const WhyChooseUs = () => (
  <Section className={styles.whySection}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Why Businesses Choose AdVortex AI</h2>
      <p style={{ opacity: 0.7, maxWidth: '600px', margin: '20px auto 0', fontSize: '18px' }}>
        Technology alone doesn't create results. Success comes from understanding how technology fits into a business.
      </p>
    </div>
    
    <div className={styles.whyGrid}>
      {whyReasons.map((reason, idx) => {
        const Icon = reason.icon;
        return (
          <motion.div 
            key={idx}
            className={styles.whyCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Icon size={36} className={styles.whyIcon} />
            <h3>{reason.title}</h3>
            <p>{reason.desc}</p>
          </motion.div>
        );
      })}
    </div>
  </Section>
);

const FounderQuote = () => {
  return (
    <section className={styles.founderSection}>
      <Section>
        <motion.div 
          className={styles.quoteWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Quote size={60} className={styles.quoteMark} />
          <p className={styles.quoteText}>
            "When I started AdVortex AI, the vision wasn't simply to build websites or automate tasks. The goal was to help businesses take advantage of modern technology in a way that feels practical, accessible, and impactful. AI is changing the way businesses operate, but successful implementation requires more than tools. It requires strategy, creativity, and understanding."
          </p>
          <div className={styles.founderInfo}>
            <div className={styles.founderAvatar}>
              <img src={founderImg} alt="Harshit Shiv" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <div className={styles.founderDetails}>
              <div className={styles.founderName}>Harshit Shiv</div>
              <div className={styles.founderTitle}>Founder, AdVortex AI</div>
            </div>
          </div>
        </motion.div>
      </Section>
    </section>
  );
};

const FinalCTA = () => (
  <section className={styles.ctaSection}>
    <Section>
      <motion.div 
        className={styles.ctaCard}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className={styles.ctaContent}>
          <h2>Ready To Build Something Meaningful?</h2>
          <p>Whether you're exploring AI automation, intelligent chatbots, modern websites, or digital growth systems, we're here to help transform ideas into scalable solutions.</p>
          <div className={styles.ctaButtons}>
            <Link to="/contact">
              <Button variant="primary">Book A Free Strategy Call</Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary">Start Your Project</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  </section>
);

// --- Page Component ---
const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.portfolioPage}>
      <PortfolioHero />
      <FeaturedWork />
      <ProcessTimeline />
      <WhyChooseUs />
      <FounderQuote />
      <FinalCTA />
    </div>
  );
};

export default Portfolio;
