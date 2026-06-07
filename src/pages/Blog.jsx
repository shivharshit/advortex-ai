import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, ArrowRight, BookOpen, Send, TrendingUp, Cpu, LayoutTemplate, Zap, Radio } from 'lucide-react';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { articlesData } from '../data/articles';
import styles from './Blog.module.css';

const categoriesData = [
  {
    title: "AI Tools",
    icon: Cpu,
    desc: "Discover the latest AI tools, platforms, and technologies shaping the future of work.",
    topics: ["Best AI Tools", "ChatGPT Guides", "Claude Tutorials", "Gemini Updates", "DeepSeek Insights", "Qwen Use Cases"]
  },
  {
    title: "AI Automation",
    icon: Zap,
    desc: "Learn how businesses automate repetitive tasks and create efficient workflows.",
    topics: ["n8n Tutorials", "Zapier Automations", "Make Workflows", "CRM Automation", "Business Systems"]
  },
  {
    title: "Digital Marketing",
    icon: TrendingUp,
    desc: "Growth-focused strategies for attracting customers and increasing revenue.",
    topics: ["SEO", "Google Ads", "Meta Ads", "Content Marketing", "Lead Generation"]
  },
  {
    title: "Website Development",
    icon: LayoutTemplate,
    desc: "Modern website strategies, user experience principles, and conversion optimization.",
    topics: ["Landing Pages", "SaaS Websites", "Conversion Design", "Website Performance", "User Experience"]
  },
  {
    title: "AI News & Trends",
    icon: Radio,
    desc: "Stay updated with the latest developments in artificial intelligence.",
    topics: ["AI Product Launches", "Industry Updates", "Technology Trends", "AI Business Applications"]
  }
];

const popularTags = [
  "#ArtificialIntelligence", "#Automation", "#AIChatbots", "#DigitalMarketing", 
  "#LeadGeneration", "#SEO", "#BusinessGrowth", "#WebsiteDevelopment", 
  "#AITrends", "#Productivity", "#Entrepreneurship", "#FutureOfWork"
];

const Blog = () => {
  const [email, setEmail] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const featuredCategories = ["AI Automation", "Digital Marketing", "AI Tools", "Website Development", "AI News & Trends"];
  const featuredArticles = featuredCategories.map(cat => articlesData.find(a => a.category === cat)).filter(Boolean);
  
  const featuredIds = new Set(featuredArticles.map(a => a.id));
  const allArticles = articlesData.filter(a => !featuredIds.has(a.id));
  
  const latestArticlesList = activeCategory === 'All' 
    ? articlesData 
    : articlesData.filter(a => a.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Newsletter Subscriber',
          email: email,
          service: 'Newsletter Subscription',
          message: 'Subscribed to AdVortex Insights Newsletter.'
        })
      });

      if (response.ok) {
        alert("Subscribed successfully! You'll receive our next update soon.");
        setEmail('');
      } else {
        alert("Failed to subscribe. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            animate={{
              y: ["0vh", "-100vh"],
              x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              opacity: [0, 0.4, 0],
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.badge}
        >
          <span className={styles.badgeGlow}></span>
          AdVortex Insights
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.pageTitle}
        >
          Real-World AI, Automation <br />
          <span className="text-gradient">& Growth Strategies</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.pageSubtitle}
        >
          <p>Welcome to the AdVortex AI Knowledge Hub.</p>
          <p>This is where we share practical insights, proven strategies, emerging technologies, and real-world experiences that help businesses leverage AI, automation, and digital growth more effectively.</p>
          <p className={styles.highlightText}>No hype. No unnecessary jargon. Just actionable knowledge that helps businesses make smarter decisions and stay ahead in a rapidly changing digital world.</p>
          <p>Whether you're a startup founder, business owner, marketer, consultant, or technology enthusiast, you'll find valuable insights designed to help you grow.</p>
        </motion.div>
      </Section>

      {/* Featured Insights Carousel/Grid */}
      <Section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Editor's Picks</h2>
          <p className={styles.sectionSubtitle}>Top insights across our core categories</p>
        </div>
        
        <div className={styles.featuredSleekGrid}>
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link to={`/blog/${article.id}`} className={styles.sleekCardLink}>
                <div className={styles.sleekCard}>
                  <div className={styles.sleekImageWrapper}>
                    <img src={article.img} alt={article.title} className={styles.sleekImage} />
                    <div className={styles.sleekCategoryBadge}>{article.category}</div>
                  </div>
                  <div className={styles.sleekContent}>
                    <h3 className={styles.sleekTitle}>{article.title}</h3>
                    <div className={styles.sleekMeta}>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Categories */}
      <Section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Browse By Category</h2>
        <div className={styles.categoryGrid}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveCategory('All')}
            style={{ cursor: 'pointer' }}
          >
            <GlassCard className={`${styles.categoryCard} ${activeCategory === 'All' ? styles.activeCategory : ''}`}>
              <div className={styles.catHeader}>
                <BookOpen className={styles.catIcon} size={24} />
                <h3>All Articles</h3>
              </div>
              <p className={styles.catDesc}>Browse all our latest insights and strategies.</p>
            </GlassCard>
          </motion.div>
          {categoriesData.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard 
                className={`${styles.categoryCard} ${activeCategory === cat.title ? styles.activeCategory : ''}`}
                onClick={() => {
                  setActiveCategory(cat.title);
                  document.getElementById('latest-articles').scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.catHeader}>
                  <cat.icon className={styles.catIcon} size={24} />
                  <h3>{cat.title}</h3>
                </div>
                <p className={styles.catDesc}>{cat.desc}</p>
                <div className={styles.topicTags}>
                  {cat.topics.map((topic, tIdx) => (
                    <span key={tIdx} className={styles.topicTag}>{topic}</span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Latest Articles Grid */}
      <Section className={styles.latestSection} id="latest-articles">
        <h2 className={styles.sectionTitle}>
          {activeCategory === 'All' ? 'Latest Articles' : `${activeCategory} Articles`}
        </h2>
        
        {latestArticlesList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            No articles found in this category yet.
          </div>
        ) : (
          <div className={styles.articlesGrid}>
            {latestArticlesList.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/blog/${article.id}`} style={{textDecoration: 'none'}}>
                <GlassCard className={styles.articleCard}>
                  <div className={styles.articleImageWrapper}>
                    <img src={article.img} alt={article.title} className={styles.articleImage} />
                    <div className={styles.articleCategory}>{article.category}</div>
                  </div>
                  <div className={styles.articleCardContent}>
                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <div className={styles.articleMeta}>
                      <div className={styles.authorInfoSmall}>
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className={styles.readTimeSmall}>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
          </div>
        )}
      </Section>

      {/* Founder Perspective */}
      <Section className={styles.founderSection}>
        <GlassCard className={styles.founderCard}>
          <div className={styles.founderGrid}>
            <div className={styles.founderImageContainer}>
              <div className={styles.founderImageGlow}></div>
              <img src="/founder.jpg" alt="Harshit Shiv" className={styles.founderLargeImg} />
            </div>
            
            <div className={styles.founderContent}>
              <div className={styles.founderBadge}>Founder Perspective</div>
              <h2>From The Desk Of <span className="text-gradient">Harshit Shiv</span></h2>
              
              <div className={styles.founderQuotes}>
                <p>Technology evolves rapidly. Every week new AI tools emerge, marketing strategies change, and businesses face new challenges.</p>
                <p>Through AdVortex Insights, I share my experiences, observations, and practical strategies that can help businesses navigate this evolving landscape.</p>
                <p className={styles.quoteEmphasis}>"My goal is not just to discuss technology. My goal is to help business owners understand how to apply technology in ways that create meaningful results."</p>
                <p>Whether it's AI automation, lead generation, websites, or digital growth systems, every article is written with a focus on practical implementation and real business value.</p>
              </div>
              
              <div className={styles.founderSignoff}>
                <strong>— Harshit Shiv</strong>
                <span>Founder, AdVortex AI</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* Popular Topics Tags */}
      <Section className={styles.tagsSection}>
        <h2 className={styles.sectionTitle}>Popular Topics</h2>
        <div className={styles.tagsContainer}>
          {popularTags.map((tag, idx) => (
            <motion.a
              key={idx}
              href="#"
              className={styles.hashTag}
              whileHover={{ scale: 1.05, color: '#fff', borderColor: 'rgba(0, 229, 255, 0.5)' }}
            >
              {tag}
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section className={styles.newsletterSection}>
        <GlassCard className={styles.newsletterCard}>
          <div className={styles.newsletterGlow}></div>
          <BookOpen className={styles.newsletterIcon} size={48} />
          <h2>Stay Ahead Of The <span className="text-gradient">AI Curve</span></h2>
          <p>Get practical AI insights, automation strategies, growth tactics, and industry updates delivered directly to your inbox.</p>
          <p className={styles.newsletterSub}>Join founders, marketers, consultants, and business owners who are leveraging AI to stay competitive.</p>
          
          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe To Insights <Send size={16} />
            </button>
          </form>
          <p className={styles.privacyNote}>No spam. Unsubscribe anytime.</p>
        </GlassCard>
      </Section>

      {/* Final Message */}
      <Section className={styles.finalSection}>
        <div className={styles.finalContent}>
          <h3>Knowledge creates opportunities. <span className="text-gradient">Implementation creates results.</span></h3>
          <p>At AdVortex AI, we aim to help businesses move beyond understanding technology and start using it to create measurable growth.</p>
          <p>Explore our latest insights and discover what's possible when innovation meets strategy.</p>
        </div>
      </Section>

    </div>
  );
};

export default Blog;
