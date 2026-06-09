import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { servicesData } from '../data/services';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import styles from './ServiceDetail.module.css';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find(s => s.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Schema generation
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "AdVortexAI",
      "url": "https://advortex.in"
    },
    "areaServed": "India",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.features.map((feat, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feat.title
        }
      }))
    }
  };

  const faqSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://advortex.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://advortex.in/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://advortex.in/services/${service.id}`
      }
    ]
  };

  return (
    <div className={styles.servicePageWrapper}>
      <Helmet>
        <title>{service.seoTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={`https://advortex.in/services/${service.id}`} />
        <meta property="og:title" content={service.seoTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={`https://advortex.in/services/${service.id}`} />
        <script type="application/ld+json">
          {JSON.stringify([schemaMarkup, faqSchemaMarkup, breadcrumbSchemaMarkup])}
        </script>
      </Helmet>

      {/* Hero Section */}
      <Section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>AdVortexAI Services</div>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.subtitle}>{service.metaDescription}</p>
          <div className={styles.ctaGroup}>
            <Link to="/contact">
              <Button variant="primary" icon={<ArrowRight size={18} />}>Get a Free Proposal</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Book a Consultation</Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Overview & Deep Dive (SEO Text) */}
      <Section className={styles.contentSection}>
        <div className={styles.articleBody} dangerouslySetInnerHTML={{ __html: service.content }} />
      </Section>

      {/* Key Features */}
      <Section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Key Offerings in {service.title}</h2>
        <div className={styles.featuresGrid}>
          {service.features.map((feature, idx) => (
            <GlassCard key={idx} className={styles.featureCard}>
              <CheckCircle className={styles.featureIcon} size={28} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {service.faqs.map((faq, idx) => (
            <div key={idx} className={styles.faqItem}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className={styles.ctaSection}>
        <GlassCard className={styles.ctaCard}>
          <h2>Ready to Scale with {service.title}?</h2>
          <p>Contact AdVortexAI today to transform your business process and accelerate growth.</p>
          <div className={styles.ctaButtons}>
            <Link to="/contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary">Get Started Now</Button>
            </Link>
          </div>
        </GlassCard>
      </Section>
    </div>
  );
};

export default ServiceDetail;
