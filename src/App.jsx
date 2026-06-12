import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy loaded components and pages
const Chatbot = lazy(() => import('./components/ui/Chatbot'));
const WhatsAppButton = lazy(() => import('./components/ui/WhatsAppButton'));
const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const AITools = lazy(() => import('./pages/AITools'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Admin = lazy(() => import('./pages/Admin'));
const Careers = lazy(() => import('./pages/Careers'));
const WorkplacePolicy = lazy(() => import('./pages/WorkplacePolicy'));

function App() {
  return (
    <>
      <HelmetProvider>
        <Router>
          <CustomCursor />
          <Navbar />
          <main>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
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
                <Route path="/workplace-policy" element={<WorkplacePolicy />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Suspense fallback={null}>
            <Chatbot />
            <WhatsAppButton />
          </Suspense>
        </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
