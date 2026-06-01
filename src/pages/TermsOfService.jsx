import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import ReactMarkdown from 'react-markdown';
import styles from './Legal.module.css';

const termsContent = `
# Terms of Service

Last Updated: June 2026

Welcome to AdVortex AI.

These Terms of Service govern your access to and use of the AdVortex AI website, products, and services.

By accessing or using our website, you agree to these terms.

## Services

AdVortex AI provides services including but not limited to:
* AI Chatbot Development
* AI Automation Solutions
* Website Development
* Digital Marketing
* SEO Services
* Lead Generation Systems
* AI Consulting
* Technology Strategy

Service availability may change without notice.

## User Responsibilities

By using our website, you agree to:
* Provide accurate information
* Use our services lawfully
* Not misuse or interfere with website functionality
* Not attempt unauthorized access to systems or data

## Intellectual Property

All website content, branding, designs, graphics, text, logos, and materials are the property of AdVortex AI unless otherwise stated.

Unauthorized reproduction, distribution, or use is prohibited without written permission.

## Project Agreements

Specific client projects may be governed by separate agreements, proposals, contracts, or statements of work.

Where a separate agreement exists, that agreement will take precedence.

## Payments

Clients agree to pay fees according to agreed project proposals or invoices.

Failure to make payments may result in project delays, suspension, or termination of services.

## Limitation of Liability

AdVortex AI provides services on a professional best-effort basis.

We do not guarantee:
* Specific revenue outcomes
* Search engine rankings
* Advertising performance
* Business growth results
* Platform availability

To the fullest extent permitted by law, AdVortex AI shall not be liable for indirect, incidental, or consequential damages arising from use of our services.

## Third-Party Platforms

Our services may integrate with third-party tools, software, APIs, and platforms.

We are not responsible for interruptions, policy changes, pricing changes, or performance issues caused by third-party providers.

## Website Availability

We strive to maintain website availability but do not guarantee uninterrupted access.

Maintenance, updates, or technical issues may occasionally affect availability.

## Termination

We reserve the right to suspend or terminate access to our services if users violate these Terms of Service.

## Changes To Terms

We may modify these Terms periodically.

Updated versions will be posted on this page with the revised effective date.

## Contact Information

For questions regarding these Terms:

Email: [support@advortex.in](mailto:support@advortex.in)  
Website: AdVortex AI

By using our website and services, you acknowledge that you have read, understood, and agreed to these Terms of Service.
`;

const TermsOfService = () => {
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
            <h1>Terms of Service</h1>
          </div>
          
          <div className={styles.legalContent}>
            <div className={styles.markdown}>
              <ReactMarkdown>
                {termsContent}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default TermsOfService;
