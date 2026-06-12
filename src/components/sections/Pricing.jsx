import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import TiltCard from '../ui/TiltCard';
import { Link } from 'react-router-dom';
import styles from './Pricing.module.css';

const monthlyPlans = [
  {
    name: "Starter Growth",
    subtitle: "For small businesses & personal brands starting online",
    priceINR: "₹18,699",
    priceUSD: "$199",
    features: [
      "Social Media Management (2 platforms)",
      "8–12 Monthly Posts (AI-assisted creatives)",
      "Basic Meta Ads Setup (FB & IG)",
      "Basic SEO (On-page optimization)",
      "Google Business Profile Setup",
      "Content captions & hashtag strategy",
      "Monthly performance report"
    ],
    bestFor: "Local businesses, Coaches & freelancers, New startups",
    featured: false
  },
  {
    name: "Growth Accelerator",
    subtitle: "For businesses ready to generate consistent leads",
    priceINR: "₹39,999",
    priceUSD: "$440",
    features: [
      "Full Social Media Mgmt (IG, FB, LinkedIn)",
      "15–20 posts + reels/month",
      "Meta Ads + Google Ads Management",
      "Landing page optimization",
      "Keyword research + SEO blog strategy",
      "Lead generation campaigns",
      "Competitor analysis",
      "Weekly performance tracking"
    ],
    bestFor: "Growing brands, Service businesses, E-commerce starters",
    featured: true
  },
  {
    name: "Performance Marketing",
    subtitle: "For brands focused on sales & ROI",
    priceINR: "₹69,999",
    priceUSD: "$760",
    features: [
      "Advanced Meta Ads + Google Ads optimization",
      "Funnel building (landing pages + tracking)",
      "Retargeting & lookalike campaigns",
      "4–6 SEO blogs/month",
      "Conversion tracking setup (Pixel + GA4)",
      "A/B testing of ads & creatives",
      "Monthly strategy call",
      "ROAS-focused optimization"
    ],
    bestFor: "E-commerce brands, High competition industries",
    featured: false
  },
  {
    name: "AdVortex Dominance",
    subtitle: "Full AI-powered growth system for scaling brands",
    priceINR: "₹99,999",
    priceUSD: "$1100",
    features: [
      "Complete Digital Marketing Management",
      "AI-driven content system",
      "Advanced Performance Marketing",
      "SEO Authority Building (8-10 blogs)",
      "Automation setup (CRM workflows)",
      "AI chatbot integration (lead capture)",
      "Full funnel strategy",
      "Weekly reporting + strategy calls"
    ],
    bestFor: "Scaling companies, Funded startups, High-growth brands",
    featured: true
  }
];

const servicePacks = [
  { name: "AI Website & Funnel Setup", priceINR: "₹12,999 – ₹24,999", priceUSD: "$150 – $300", desc: "Full landing page, sales funnel, CTA optimization, basic SEO, WhatsApp integration." },
  { name: "AI Chatbot + Lead Automation", priceINR: "₹6,999 – ₹14,999", priceUSD: "$85 – $180", desc: "Website AI chatbot, FAQ automation, lead capture, CRM integration, custom scripts." },
  { name: "Performance Ads Setup", priceINR: "₹4,999 – ₹9,999", priceUSD: "$60 – $120", desc: "Meta Ads setup, campaign structure, pixel tracking, ad copy, conversion tracking." },
  { name: "SEO Foundation Pack", priceINR: "₹5,999 – ₹11,999", priceUSD: "$70 – $145", desc: "Full SEO audit, high-intent keywords, on-page optimization, meta tags, Google indexing." },
  { name: "Brand Identity Starter", priceINR: "₹4,999 – ₹9,999", priceUSD: "$60 – $120", desc: "AI-assisted logo, color palette, typography, social branding kit, profile optimization." },
  { name: "Social Media Growth Setup", priceINR: "₹7,999 – ₹15,999", priceUSD: "$95 – $195", desc: "30-day content strategy, templates, hashtag system, profile optimization, competitor analysis." },
  { name: "Analytics & Tracking Setup", priceINR: "₹3,999 – ₹8,999", priceUSD: "$50 – $110", desc: "GA4 setup, Search Console, Meta Pixel, event tracking, custom reporting dashboard." },
  { name: "AI Business Automation", priceINR: "₹14,999 – ₹29,999", priceUSD: "$180 – $360", desc: "Lead automation, WhatsApp auto-responder, email sequences, CRM setup, Zapier/Make workflows.", isHighValue: true },
  { name: "Website Speed & Optimization", priceINR: "₹3,999 – ₹7,999", priceUSD: "$50 – $95", desc: "Performance audit, speed optimization, image compression, Core Web Vitals, UX improvements." },
  { name: "AI Growth Strategy Consultation", priceINR: "₹1,999 – ₹4,999", priceUSD: "$25 – $60", desc: "1:1 strategy call, funnel breakdown, AI opportunities, custom scaling roadmap." }
];

const oneTimeServices = [
  { name: "Website Design (Landing Page)", priceINR: "₹7,999", priceUSD: "$95" },
  { name: "Full Business Website", priceINR: "₹15,000 – ₹25,000", priceUSD: "$180 – $300" },
  { name: "SEO Audit & Fix", priceINR: "₹5,000", priceUSD: "$60" },
  { name: "Meta Ads Setup", priceINR: "₹3,999", priceUSD: "$50" },
  { name: "Funnel Setup", priceINR: "₹9,999", priceUSD: "$120" },
  { name: "Branding Kit (Logo + Identity)", priceINR: "₹4,999", priceUSD: "$60" },
  { name: "AI Chatbot / Chatbox Creation", priceINR: "₹6,999 – ₹14,999", priceUSD: "$85 – $180" }
];

const AnimatedPrice = ({ priceINR, priceUSD, currency }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currency}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'inline-block' }}
        >
          {currency === 'INR' ? priceINR : priceUSD}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [currency, setCurrency] = useState('INR');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrency(prev => (prev === 'INR' ? 'USD' : 'INR'));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="pricing" className={styles.pricingSection}>
      <div className={styles.header}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          Transparent <span className="text-gradient">Pricing</span> & Services
        </motion.h2>
        <p className={styles.subtitle}>Invest in AI automation and growth systems that pay for themselves.</p>
        
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'monthly' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly Growth Plans
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'packs' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('packs')}
          >
            One-Time Services & Packs
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'monthly' ? (
          <motion.div 
            key="monthly"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.monthlyGrid}
          >
            {monthlyPlans.map((plan, index) => (
              <div key={index} style={{ height: '100%' }}>
                <TiltCard glowColor={plan.featured ? "rgba(168, 85, 247, 0.4)" : "rgba(0, 229, 255, 0.15)"}>
                  <div 
                    className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
                    style={{ background: 'transparent', margin: 0, border: 'none', boxShadow: 'none', height: '100%' }}
                  >
                    {plan.featured && <div className={styles.badge}>{index === 1 ? 'Most Popular' : 'Premium'}</div>}
                    <div className={styles.cardHeader}>
                      <h3>{plan.name}</h3>
                      <p className={styles.planSubtitle}>{plan.subtitle}</p>
                      <div className={styles.price}>
                        <AnimatedPrice priceINR={plan.priceINR} priceUSD={plan.priceUSD} currency={currency} />
                        <span>/mo</span>
                      </div>
                      <p className={styles.bestFor}><strong>Best for:</strong> {plan.bestFor}</p>
                    </div>
                    <div className={styles.features}>
                      {plan.features.map((feature, i) => (
                        <div key={i} className={styles.feature}>
                          <Check size={18} className={styles.checkIcon} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.action}>
                      <Link to="/contact" style={{ width: '100%' }}>
                        <Button variant={plan.featured ? "primary" : "secondary"} className={`${styles.button} hover-target`}>
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="packs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.packsContainer}
          >
            <div className={styles.packsGrid}>
              {servicePacks.map((pack, index) => (
                <div key={index} style={{ height: '100%' }}>
                  <TiltCard glowColor={pack.isHighValue ? "rgba(168, 85, 247, 0.4)" : "rgba(0, 229, 255, 0.15)"}>
                    <div className={`${styles.packCard} ${pack.isHighValue ? styles.highValuePack : ''}`} style={{ background: 'transparent', margin: 0, border: 'none', boxShadow: 'none', height: '100%' }}>
                      {pack.isHighValue && <div className={styles.highValueBadge}><Star size={12}/> High Value</div>}
                      <h4>{pack.name}</h4>
                      <div className={styles.packPrice}>
                        <AnimatedPrice priceINR={pack.priceINR} priceUSD={pack.priceUSD} currency={currency} />
                      </div>
                      <p>{pack.desc}</p>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>

            <div className={styles.oneTimeList}>
              <h3 className={styles.oneTimeTitle}>⚡ Individual Growth & Tech Services</h3>
              <div className={styles.oneTimeGrid}>
                {oneTimeServices.map((service, index) => (
                  <div key={index} className={styles.oneTimeItem}>
                    <span className={styles.serviceName}>{service.name}</span>
                    <span className={styles.servicePrice}>
                      <AnimatedPrice priceINR={service.priceINR} priceUSD={service.priceUSD} currency={currency} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Pricing;
