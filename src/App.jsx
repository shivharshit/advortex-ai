import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Chatbot from './components/ui/Chatbot';
import WhatsAppButton from './components/ui/WhatsAppButton';
import LoadingScreen from './components/ui/LoadingScreen';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import Portfolio from './pages/Portfolio';
import AITools from './pages/AITools';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import PricingPage from './pages/PricingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Admin from './pages/Admin';
import Careers from './pages/Careers';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Removed heavy global mouse tracking to fix layout thrashing lag

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.8s ease-in-out' }}>
        <HelmetProvider>
          <Router>
            <CustomCursor />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/ai-tools" element={<AITools />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/careers" element={<Careers />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
            <WhatsAppButton />
          </Router>
        </HelmetProvider>
      </div>
    </>
  );
}

export default App;
