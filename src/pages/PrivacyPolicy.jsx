import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import ReactMarkdown from 'react-markdown';
import styles from './Legal.module.css';

const privacyContent = `
# Privacy Policy

Last Updated: June 2026

Welcome to AdVortex AI.

At AdVortex AI, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or use our services.

## Information We Collect

We may collect the following information:

### Personal Information
* Full Name
* Email Address
* Phone Number
* Company Name
* Website URL
* Project Information
* Communication Preferences

### Technical Information
* IP Address
* Browser Type
* Device Information
* Pages Visited
* Referral Sources
* Website Usage Data

### Information Submitted Through Forms
When you contact us, book a consultation, use our chatbot, or submit a form, we may collect the information you voluntarily provide.

## How We Use Your Information

We use collected information to:
* Respond to inquiries
* Provide requested services
* Schedule consultations
* Improve our website and services
* Send project-related communications
* Analyze website performance
* Provide customer support
* Deliver marketing communications when permitted

## AI Chatbot & Automation Data

Information submitted through our AI assistant, Vortex, may be used to:
* Qualify leads
* Recommend services
* Schedule consultations
* Improve user experience
* Provide customer support

## Cookies & Analytics

Our website may use cookies and analytics tools to improve performance and understand visitor behavior.

These technologies help us:
* Analyze website traffic
* Improve user experience
* Measure marketing effectiveness
* Optimize website performance

Users may disable cookies through their browser settings.

## Third-Party Services

We may use trusted third-party services including:
* Google Analytics
* Google Ads
* Meta Platforms
* Calendly
* WhatsApp
* Email Service Providers
* CRM Platforms
* Automation Platforms

These services may collect information according to their own privacy policies.

## Data Security

We implement reasonable technical and organizational measures to protect your information from unauthorized access, misuse, or disclosure.

While we strive to protect your data, no online system can guarantee absolute security.

## Data Retention

We retain information only as long as necessary to:
* Provide services
* Fulfill legal obligations
* Resolve disputes
* Improve our business operations

## Your Rights

You may request to:
* Access your information
* Correct inaccurate information
* Delete personal information
* Withdraw consent where applicable
* Opt out of marketing communications

To exercise these rights, contact us using the information below.

## Contact Information

For privacy-related questions:

Email: [support@advortex.in](mailto:support@advortex.in)  
Website: AdVortex AI

## Changes To This Policy

We may update this Privacy Policy periodically. Updates will be posted on this page with the revised effective date.

By using our website, you agree to the terms outlined in this Privacy Policy.
`;

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Section className={styles.legalSection}>
        <motion.div 
          className={styles.legalContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.legalHeader}>
            <div className={styles.badge}>Legal</div>
            <h1>Privacy Policy</h1>
          </div>
          
          <div className={styles.legalContent}>
            <div className={styles.markdown}>
              <ReactMarkdown>
                {privacyContent}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default PrivacyPolicy;
