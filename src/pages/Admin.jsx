import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Download, Database, Search, TrendingUp, Users, Calendar, ShieldCheck } from 'lucide-react';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import styles from './Admin.module.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' or 'applications'
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-scroll to top
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Secure check using environment variable
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === correctPassword) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError('Incorrect master password');
      setPassword('');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = { 'Authorization': 'Bearer advortex-admin' };
      const [leadsRes, appsRes] = await Promise.all([
        fetch('/api/leads', { headers }),
        fetch('/api/careers', { headers })
      ]);
      
      if (leadsRes.ok) {
        setLeads(await leadsRes.json());
      }
      if (appsRes.ok) {
        setApplications(await appsRes.json());
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    setIsLoading(false);
  };

  const handleExport = () => {
    window.location.href = '/api/leads/export';
  };

  const filteredLeads = leads.filter(lead => 
    lead.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.service?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(app => 
    app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.skills?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate some fun stats
  const recentLeadsCount = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return leads.filter(l => new Date(l.date) > sevenDaysAgo).length;
  }, [leads]);

  if (!isAuthenticated) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.particlesContainer}>
          {[...Array(15)].map((_, i) => (
            <div key={i} className={styles.particle} style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />
          ))}
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.loginCardWrapper}>
          <GlassCard className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <div className={styles.lockIconWrapper}>
                <ShieldCheck size={36} className={styles.lockIcon} />
                <div className={styles.lockGlow}></div>
              </div>
              <h2>Admin Portal</h2>
              <p>Enter the master password to securely access the CRM.</p>
            </div>
            
            <form onSubmit={handleLogin} className={styles.loginForm}>
              <div className={styles.inputGroup}>
                <input 
                  type="password" 
                  placeholder="Master Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  autoFocus
                />
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }} 
                    className={styles.errorText}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
              <Button variant="primary" type="submit" className={styles.loginBtn}>Authenticate Access</Button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <Section className={styles.dashboardSection}>
        <div className={styles.dashboardHeader}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={styles.headerLeft}>
            <h1>Lead Management <span className="text-gradient">Hub</span></h1>
            <p>Your secure command center for client acquisition.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={styles.headerRight}>
            <Button variant="secondary" onClick={handleExport} className={styles.exportBtn}>
              <Download size={18} /> Export All to CSV
            </Button>
          </motion.div>
        </div>

        {/* Premium Stats Row */}
        <div className={styles.statsRow}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard className={styles.premiumStatCard}>
              <div className={styles.premiumStatIcon}><Users size={24} /></div>
              <div className={styles.premiumStatInfo}>
                <span className={styles.premiumStatValue}>{leads.length}</span>
                <span className={styles.premiumStatLabel}>Total Leads Captured</span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard className={styles.premiumStatCard}>
              <div className={styles.premiumStatIcon} style={{ color: 'var(--color-cyan)', background: 'rgba(0, 229, 255, 0.1)' }}>
                <TrendingUp size={24} />
              </div>
              <div className={styles.premiumStatInfo}>
                <span className={styles.premiumStatValue}>{recentLeadsCount}</span>
                <span className={styles.premiumStatLabel}>New Leads (7 Days)</span>
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <GlassCard className={styles.premiumStatCard}>
              <div className={styles.premiumStatIcon} style={{ color: '#ec4899', background: 'rgba(236, 72, 153, 0.1)' }}>
                <Calendar size={24} />
              </div>
              <div className={styles.premiumStatInfo}>
                <span className={styles.premiumStatValue}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span className={styles.premiumStatLabel}>Last Sync Date</span>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <GlassCard className={styles.dashboardCard}>
            <div className={styles.toolbar}>
              <div className={styles.tabsContainer}>
                <button 
                  className={`${styles.tabBtn} ${activeTab === 'leads' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('leads')}
                >
                  Client Leads
                </button>
                <button 
                  className={`${styles.tabBtn} ${activeTab === 'applications' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('applications')}
                >
                  Job Applications
                </button>
              </div>
              
              <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search by name, email, or role..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.tableContainer}>
              {isLoading ? (
                <div className={styles.loadingState}>
                  <div className={styles.loader}></div>
                  <p>Syncing secure data...</p>
                </div>
              ) : activeTab === 'leads' ? (
                filteredLeads.length > 0 ? (
                  <table className={styles.leadsTable}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Contact Info</th>
                        <th>Project / Service</th>
                        <th>Budget</th>
                        <th>Message Overview</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filteredLeads.map((lead, index) => (
                          <motion.tr 
                            key={lead.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={styles.tableRow}
                          >
                            <td className={styles.dateCell}>{new Date(lead.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                            <td>
                              <div className={styles.clientName}>{lead.fullName}</div>
                              {lead.company && <div className={styles.clientCompany}>{lead.company}</div>}
                            </td>
                            <td>
                              <div className={styles.contactEmail}>{lead.email}</div>
                              <div className={styles.contactPhone}>{lead.phone || 'No phone provided'}</div>
                            </td>
                            <td><span className={styles.serviceBadge}>{lead.service || 'General Inquiry'}</span></td>
                            <td className={styles.budgetCell}>{lead.budget || '-'}</td>
                            <td className={styles.messageCell}>
                              <div className={styles.messageContent} title={lead.message}>{lead.message || '-'}</div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                ) : (
                  <div className={styles.emptyState}>
                    <Database size={48} className={styles.emptyIcon} />
                    <h3>No matching leads found</h3>
                    <p>Try adjusting your search criteria</p>
                  </div>
                )
              ) : (
                filteredApplications.length > 0 ? (
                  <table className={styles.leadsTable}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Applicant</th>
                        <th>Role</th>
                        <th>Portfolio / Resume</th>
                        <th>Top Skills</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filteredApplications.map((app, index) => (
                          <motion.tr 
                            key={app.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={styles.tableRow}
                          >
                            <td className={styles.dateCell}>{new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                            <td>
                              <div className={styles.clientName}>{app.fullName}</div>
                              <div className={styles.contactEmail}>{app.email}</div>
                            </td>
                            <td><span className={styles.serviceBadge}>{app.role}</span></td>
                            <td>
                              {app.resumeUrl ? (
                                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.contactEmail} style={{textDecoration: 'underline'}}>View Link</a>
                              ) : '-'}
                            </td>
                            <td className={styles.messageCell}>
                              <div className={styles.messageContent} title={app.skills}>{app.skills || '-'}</div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                ) : (
                  <div className={styles.emptyState}>
                    <Database size={48} className={styles.emptyIcon} />
                    <h3>No matching applications found</h3>
                    <p>Try adjusting your search criteria</p>
                  </div>
                )
              )}
            </div>
          </GlassCard>
        </motion.div>
      </Section>
    </div>
  );
};

export default Admin;
