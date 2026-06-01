import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Share2, MessageCircle, Mail, Link as LinkIcon } from 'lucide-react';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import { articlesData } from '../data/articles';
import styles from './BlogPost.module.css';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const article = articlesData.find(a => a.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className={styles.notFoundWrapper}>
        <div className={styles.particlesContainer}>
          <div className={styles.particle} style={{left: '20%', top: '30%', background: 'var(--color-cyan)'}}></div>
          <div className={styles.particle} style={{left: '80%', top: '70%', background: 'var(--color-purple)'}}></div>
        </div>
        <GlassCard className={styles.notFoundCard}>
          <h2>Article Not Found</h2>
          <p>The article you are looking for does not exist or has been moved.</p>
          <button onClick={() => navigate('/blog')} className={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Blog
          </button>
        </GlassCard>
      </div>
    );
  }

  const handleShare = (platform) => {
    alert(`Sharing to ${platform}...`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            animate={{
              y: ["0vh", "-100vh"],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? 'var(--color-cyan)' : 'var(--color-purple)'
            }}
          />
        ))}
      </div>

      <Section className={styles.articleSection}>
        <div className={styles.articleContainer}>
          <Link to="/blog" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Insights
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.articleHeader}
          >
            <div className={styles.badge}>{article.category}</div>
            <h1 className={styles.title}>{article.title}</h1>
            
            <div className={styles.metaRow}>
              <div className={styles.authorInfo}>
                <img src="/founder.jpg" alt={article.author} className={styles.authorAvatar} />
                <div className={styles.authorText}>
                  <span className={styles.authorName}>{article.author}</span>
                  <span className={styles.publishDate}>{article.date}</span>
                </div>
              </div>
              <div className={styles.readTime}>
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={styles.imageWrapper}
          >
            <img src={article.img} alt={article.title} className={styles.heroImage} />
          </motion.div>

          <div className={styles.contentLayout}>
            <div className={styles.shareSidebar}>
              <div className={styles.stickyShare}>
                <span className={styles.shareTitle}>Share</span>
                <button onClick={() => handleShare('Twitter')} className={styles.shareBtn}><MessageCircle size={18} /></button>
                <button onClick={() => handleShare('LinkedIn')} className={styles.shareBtn}><Mail size={18} /></button>
                <button onClick={() => handleShare('Facebook')} className={styles.shareBtn}><LinkIcon size={18} /></button>
                <button onClick={() => handleShare('Link')} className={styles.shareBtn}><Share2 size={18} /></button>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.mainContent}
            >
              <div className={styles.markdown}>
                <ReactMarkdown>
                  {article.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default BlogPost;
