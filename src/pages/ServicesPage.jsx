import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import Section from '../components/ui/Section';
import styles from './ServicesPage.module.css';

const servicesData = [
  {
    title: "AI Chatbots",
    slug: "ai-chatbot-development",
    subcategories: [
      { name: "AI Website Chatbots", items: ["24/7 Customer Support", "Lead Qualification", "FAQ Automation", "Appointment Booking", "Product Recommendations"] },
      { name: "WhatsApp AI Chatbots", items: ["Lead Capture", "Customer Support", "Automated Follow-Ups", "Order Tracking", "WhatsApp Marketing"] },
      { name: "AI Sales Assistants", items: ["Lead Qualification", "Sales Conversations", "Meeting Scheduling", "CRM Integration", "Follow-Up Automation"] },
      { name: "Custom AI Assistants", items: ["Company Knowledge Base", "Internal Support Bots", "Employee Training Assistants", "Customer Service Agents"] }
    ]
  },
  {
    title: "AI Automation Services",
    slug: "ai-automation",
    subcategories: [
      { name: "Business Process Automation", items: ["Workflow Automation", "Task Automation", "Data Entry Automation", "Document Processing"] },
      { name: "CRM Automation", items: ["Lead Management", "Contact Segmentation", "Pipeline Automation", "Customer Follow-Ups"] },
      { name: "Email Automation", items: ["Welcome Sequences", "Lead Nurturing", "Sales Follow-Ups", "Newsletter Automation"] },
      { name: "Marketing Automation", items: ["Campaign Automation", "Social Media Scheduling", "Lead Scoring", "Customer Journeys"] },
      { name: "Sales Automation", items: ["Prospect Outreach", "Lead Qualification", "Appointment Booking", "Automated Follow-Ups"] }
    ]
  },
  {
    title: "Website Development",
    slug: "website-development",
    subcategories: [
      { name: "Business Websites", items: ["Corporate Websites", "Company Portfolios", "Service-Based Websites"] },
      { name: "Landing Pages", items: ["Lead Generation Pages", "Product Launch Pages", "Sales Funnels"] },
      { name: "AI-Powered Websites", items: ["AI Integration", "Smart User Experiences", "Conversational Interfaces"] },
      { name: "E-Commerce Websites", items: ["Online Stores", "Product Catalogs", "Checkout Optimization"] },
      { name: "SaaS Websites", items: ["Startup Websites", "Product Showcases", "Software Landing Pages"] }
    ]
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    subcategories: [
      { name: "Meta Ads", items: ["Facebook Advertising", "Instagram Advertising", "Retargeting Campaigns", "Lead Generation Campaigns"] },
      { name: "Google Ads", items: ["Search Campaigns", "Display Campaigns", "Remarketing", "Conversion Optimization"] },
      { name: "Social Media Marketing", items: ["Content Strategy", "Account Management", "Growth Campaigns", "Audience Engagement"] },
      { name: "Performance Marketing", items: ["ROI Optimization", "Conversion Tracking", "Funnel Optimization", "Analytics Reporting"] }
    ]
  },
  {
    title: "SEO Services",
    slug: "seo-services",
    subcategories: [
      { name: "On-Page SEO", items: ["Keyword Optimization", "Content Optimization", "Technical Improvements"] },
      { name: "Technical SEO", items: ["Website Audits", "Speed Optimization", "Schema Markup", "Core Web Vitals"] },
      { name: "Local SEO", items: ["Google Business Profile", "Local Rankings", "Local Lead Generation"] },
      { name: "Content SEO", items: ["Blog Content", "SEO Articles", "Topic Clusters", "Authority Building"] }
    ]
  },
  {
    title: "Lead Generation",
    slug: "lead-generation",
    subcategories: [
      { name: "B2B Lead Generation", items: ["Prospect Research", "Lead Qualification", "Appointment Setting"] },
      { name: "LinkedIn Lead Generation", items: ["Profile Optimization", "Outreach Campaigns", "Connection Growth"] },
      { name: "Cold Email Outreach", items: ["Campaign Setup", "Lead Lists", "Follow-Up Sequences"] },
      { name: "Funnel Building", items: ["Landing Pages", "Lead Magnets", "Conversion Optimization"] }
    ]
  },
  {
    title: "WhatsApp Automation",
    slug: "whatsapp-automation",
    subcategories: [
      { name: "API Integration", items: ["Official WhatsApp Business API", "Green Tick Verification"] },
      { name: "Sales Funnels", items: ["Abandoned Cart Recovery", "Automated Checkout"] },
      { name: "Broadcasts", items: ["Targeted Messaging", "Promotional Campaigns"] }
    ]
  },
  {
    title: "Business Process Automation",
    slug: "business-process-automation",
    subcategories: [
      { name: "Zapier & Make", items: ["API Integrations", "Middleware Logic"] },
      { name: "Finance Automation", items: ["Invoice Generation", "Payment Reconciliation"] },
      { name: "Operations", items: ["Employee Onboarding", "Reporting Dashboards"] }
    ]
  },
  {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    subcategories: [
      { name: "Viral Content", items: ["Short-form Video", "Instagram Reels", "TikToks"] },
      { name: "B2B Strategy", items: ["LinkedIn Thought Leadership", "Executive Ghostwriting"] },
      { name: "Community Management", items: ["Comment Moderation", "Engagement Tracking"] }
    ]
  }
];

const industries = ["Startups", "Small Businesses", "E-Commerce Brands", "Coaches", "Consultants", "Marketing Agencies", "SaaS Companies", "Healthcare Businesses", "Real Estate Companies", "Educational Institutions", "Professional Services"];

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabQuery = searchParams.get('tab');
    
    if (tabQuery) {
      const tabIndex = servicesData.findIndex(
        s => s.title.toLowerCase().replace(/\s+/g, '-') === tabQuery
      );
      if (tabIndex !== -1) {
        setActiveTab(tabIndex);
      }
    }
    
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={styles.pageWrapper}>
      <Section className={styles.headerSection}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.pageTitle}
        >
          Our <span className="text-gradient">Services</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.pageSubtitle}
        >
          Comprehensive AI automation, development, and digital marketing solutions tailored for exponential growth.
        </motion.p>
      </Section>

      <Section className={styles.contentSection}>
        <div className={styles.layout}>
          
          {/* Sidebar Tabs */}
          <div className={styles.sidebar}>
            {servicesData.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`${styles.tabBtn} ${activeTab === idx ? styles.activeTab : ''}`}
              >
                {category.title}
                <ChevronRight size={16} className={styles.tabIcon} />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className={styles.contentArea}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.categoryContent}
              >
                <h2 className={styles.categoryTitle}>{servicesData[activeTab].title}</h2>
                <div className={styles.subCategoryGrid}>
                  {servicesData[activeTab].subcategories.map((sub, idx) => (
                    <div key={idx} className={styles.subCategoryCard}>
                      <h3>{sub.name}</h3>
                      <ul className={styles.featureList}>
                        {sub.items.map((item, i) => (
                          <li key={i}>
                            <CheckCircle2 size={16} className={styles.checkIcon} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {servicesData[activeTab].slug && (
                  <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Link to={`/services/${servicesData[activeTab].slug}`}>
                      <button className={styles.viewMoreBtn}>
                        Explore {servicesData[activeTab].title} Deep Dive <ChevronRight size={16} />
                      </button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </Section>

      <Section className={styles.industriesSection}>
        <h2 className={styles.industriesTitle}>Industries We Serve</h2>
        <div className={styles.industriesGrid}>
          {industries.map((industry, index) => (
            <motion.div 
              key={index} 
              className={styles.industryTag}
              whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.8)" }}
            >
              {industry}
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ServicesPage;
