import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import AnimatedHeadline from '../ui/AnimatedHeadline';
import styles from './Hero.module.css';

const AnimatedCounter = ({ from = 0, to, duration = 2, format = (v) => v }) => {
  const [value, setValue] = useState(from);
  
  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setValue(value);
      }
    });
    return controls.stop;
  }, [from, to, duration]);

  return <>{format(value)}</>;
};

const Hero = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'agents':
        return (
          <motion.div 
            key="agents"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.tabContent}
          >
            <div className={styles.topMetrics}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Active Agents</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={4} format={v => Math.floor(v)} /> <span className={styles.up}>All Online</span>
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Avg Response Time</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={1.2} format={v => v.toFixed(1) + 's'} /> <span className={styles.up}>Fast</span>
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Resolution Rate</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={94} format={v => Math.floor(v) + '%'} /> <span className={styles.up}>↑ 3%</span>
                </span>
              </div>
            </div>
            <div className={styles.agentList}>
              <div className={styles.agentItem}>
                <div className={styles.agentInfo}>
                  <div className={styles.agentAvatar}>🤖</div>
                  <div>
                    <h4>Customer Support Bot</h4>
                    <span>Handling tier-1 tickets</span>
                  </div>
                </div>
                <div className={styles.agentStatus}>Online</div>
              </div>
              <div className={styles.agentItem}>
                <div className={styles.agentInfo}>
                  <div className={styles.agentAvatar}>⚡</div>
                  <div>
                    <h4>Lead Qualifier</h4>
                    <span>Scoring inbound leads</span>
                  </div>
                </div>
                <div className={styles.agentStatus}>Online</div>
              </div>
            </div>
          </motion.div>
        );
      case 'automations':
        return (
          <motion.div 
            key="automations"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.tabContent}
          >
            <div className={styles.topMetrics}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Active Workflows</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={12} format={v => Math.floor(v)} />
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Executions (24h)</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={8402} format={v => Math.floor(v).toLocaleString()} />
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Hours Saved</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={42} format={v => Math.floor(v) + 'h'} /> <span className={styles.up}>This week</span>
                </span>
              </div>
            </div>
            <div className={styles.workflowMockup}>
              <div className={styles.wfNode}>Webhook Trigger</div>
              <div className={styles.wfLine}></div>
              <div className={styles.wfNode}>AI Sentiment Analysis</div>
              <div className={styles.wfLine}></div>
              <div className={styles.wfSplit}>
                <div className={styles.wfNode}>Add to CRM</div>
                <div className={styles.wfNode}>Alert Slack</div>
              </div>
            </div>
          </motion.div>
        );
      case 'analytics':
        return (
          <motion.div 
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.tabContent}
          >
             <div className={styles.topMetrics}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total Traffic</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={12.4} format={v => v.toFixed(1) + 'k'} /> <span className={styles.up}>↑ 18%</span>
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Bounce Rate</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={42} format={v => Math.floor(v) + '%'} /> <span className={styles.up}>Good</span>
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Goals Completed</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={380} format={v => Math.floor(v)} />
                </span>
              </div>
            </div>
            <div className={styles.barChartArea}>
              <div className={styles.barChart}>
                <div className={styles.bar} style={{height: '40%'}}></div>
                <div className={styles.bar} style={{height: '70%'}}></div>
                <div className={styles.bar} style={{height: '50%'}}></div>
                <div className={styles.bar} style={{height: '90%'}}></div>
                <div className={styles.bar} style={{height: '100%'}}></div>
                <div className={styles.bar} style={{height: '80%'}}></div>
                <div className={styles.bar} style={{height: '60%'}}></div>
              </div>
            </div>
          </motion.div>
        );
      case 'overview':
      default:
        return (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.tabContent}
          >
            <div className={styles.topMetrics}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total Leads</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={2481} format={v => Math.floor(v).toLocaleString()} /> <span className={styles.up}>↑ 12%</span>
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>AI Tasks Automated</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={14930} format={v => Math.floor(v).toLocaleString()} />
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Conversion Rate</span>
                <span className={styles.metricValue}>
                  <AnimatedCounter to={8.4} format={v => v.toFixed(1) + '%'} /> <span className={styles.up}>↑ 2.1%</span>
                </span>
              </div>
            </div>

            <div className={styles.bottomArea}>
              <div className={styles.chatInterface}>
                <div className={styles.chatHeader}>Live AI Agent</div>
                <div className={styles.chatMessages}>
                  <div className={styles.msgUser}>Can you summarize today's campaign performance?</div>
                  <div className={styles.msgAi}>
                    <span className={styles.aiIcon}>✦</span>
                    <div>
                      Yes! Today's Meta Ads generated 42 qualified leads at $12 CPA. The new email automation sequence has a 68% open rate.
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.graphArea}>
                <div className={styles.graphTitle}>Revenue Growth (AI Driven)</div>
                <div className={styles.graphVisual}>
                  <svg viewBox="0 0 200 100" className={styles.graphSvg}>
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(0, 229, 255, 1)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 1)" />
                      </linearGradient>
                      <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                      </linearGradient>
                    </defs>
                    <path d="M0,80 Q20,70 40,60 T80,40 T120,50 T160,20 T200,10 L200,100 L0,100 Z" fill="url(#fillGrad)" />
                    <path d="M0,80 Q20,70 40,60 T80,40 T120,50 T160,20 T200,10" fill="none" stroke="url(#lineGrad)" strokeWidth="3" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>


        <motion.div 
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.badgeDot}></span>
          Next-Gen AI Agency
        </motion.div>
        
        <AnimatedHeadline />

        <motion.div 
          className={styles.actions}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/contact">
            <Button variant="primary">Book a Free Strategy Call</Button>
          </Link>
          <Link to="/portfolio">
            <Button variant="secondary">View Our Work</Button>
          </Link>
        </motion.div>
      </div>
      
      {/* 3D Dashboard Mockup Overlay */}
      <motion.div 
        className={styles.dashboardMockup}
        initial={{ opacity: 0, y: 100, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.2, delay: 0.8, type: 'spring' }}
      >
        <div className={styles.mockupGlass}>
          <div className={styles.mockupHeader}>
            <div className={styles.windowControls}>
              <span className={styles.dotRed}></span>
              <span className={styles.dotYellow}></span>
              <span className={styles.dotGreen}></span>
            </div>
            <div className={styles.mockupTitle}>AdVortex_OS / Dashboard</div>
          </div>
          
          <div className={styles.mockupBody}>
            <div className={styles.sidebar}>
              <div 
                className={`${styles.sideItem} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveTab('overview')}
              >Overview</div>
              <div 
                className={`${styles.sideItem} ${activeTab === 'agents' ? styles.active : ''}`}
                onClick={() => setActiveTab('agents')}
              >AI Agents</div>
              <div 
                className={`${styles.sideItem} ${activeTab === 'automations' ? styles.active : ''}`}
                onClick={() => setActiveTab('automations')}
              >Automations</div>
              <div 
                className={`${styles.sideItem} ${activeTab === 'analytics' ? styles.active : ''}`}
                onClick={() => setActiveTab('analytics')}
              >Analytics</div>
            </div>
            
            <div className={styles.mainArea}>
              <AnimatePresence mode="wait">
                {renderTabContent()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
