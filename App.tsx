
import React, { useState, useEffect } from 'react';
import { Page, Theme } from './types';
import Navbar from './components/Navbar';
import AnimatedOrbs from './components/AnimatedOrbs';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PricingPage from './pages/PricingPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './components/AboutPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CareersPage from './pages/CareersPage';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import BackToTopButton from './components/BackToTopButton';
import { serviceDetails, blogPosts, portfolioItems } from './components/constants';
import LoadingSpinner from './components/LoadingSpinner';
import CaseStudyPage from './pages/CaseStudyPage';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('Home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<string | null>(null);
  const [activePortfolioItem, setActivePortfolioItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navigateTo = (targetPage: Page, id?: string) => {
    // Prevent navigation if already transitioning or navigating to the same page without a new ID
    if (isLoading || isExiting || (targetPage === page && !id && page !== 'ServiceDetail' && page !== 'BlogPost' && page !== 'CaseStudy')) {
        if (!id) window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    setIsLoading(true);
    setIsExiting(true);

    // After fade-out animation (300ms)
    setTimeout(() => {
        setActiveService(null);
        setActivePost(null);
        setActivePortfolioItem(null);

        if (targetPage === 'ServiceDetail' && id) {
          setActiveService(id);
        }
        if (targetPage === 'BlogPost' && id) {
          setActivePost(id);
        }
        if (targetPage === 'CaseStudy' && id) {
          setActivePortfolioItem(id);
        }

        setPage(targetPage);
        window.scrollTo({ top: 0, behavior: 'auto' }); // Instantly go to top for new page
        setIsExiting(false); // Page has changed, ready for fade-in animation

        // Hide spinner after it has animated and new page has started fading in
        setTimeout(() => {
            setIsLoading(false);
        }, 800); // Corresponds to the spinner's animation duration
    }, 300); // Must match the fade-out animation duration
  };

  const renderPage = () => {
    switch (page) {
      case 'Home':
        return <HomePage setPage={navigateTo} />;
      case 'Services':
        return <ServicesPage setPage={navigateTo} />;
      case 'ServiceDetail':
        const service = serviceDetails.find(s => s.id === activeService);
        return service ? <ServiceDetailPage service={service} setPage={navigateTo} /> : <ServicesPage setPage={navigateTo} />;
      case 'Pricing':
        return <PricingPage />;
      case 'Portfolio':
        return <PortfolioPage setPage={navigateTo} />;
      case 'About':
        return <AboutPage />;
      case 'Testimonials':
        return <TestimonialsPage />;
      case 'Contact':
        return <ContactPage />;
      case 'Blog':
        return <BlogPage setPage={navigateTo} />;
      case 'BlogPost':
        const post = blogPosts.find(p => p.id === activePost);
        return post ? <BlogPostPage post={post} setPage={navigateTo} /> : <BlogPage setPage={navigateTo} />;
      case 'CaseStudy':
        const item = portfolioItems.find(p => p.id === activePortfolioItem);
        return item ? <CaseStudyPage item={item} setPage={navigateTo} /> : <PortfolioPage setPage={navigateTo} />;
      case 'PrivacyPolicy':
        return <PrivacyPolicyPage />;
      case 'TermsOfService':
        return <TermsOfServicePage />;
      case 'Careers':
        return <CareersPage setPage={navigateTo} />;
      default:
        return <HomePage setPage={navigateTo} />;
    }
  };

  return (
     <div className="font-sans bg-bg_light dark:bg-bg_dark text-text_light dark:text-text_dark min-h-screen">
      <LoadingSpinner isLoading={isLoading} />
      <AnimatedOrbs theme={theme} />
      <div className="relative z-10">
        <Navbar currentPage={page} setPage={navigateTo} theme={theme} setTheme={setTheme} />
        <main className="overflow-x-hidden">
          <div key={`${page}-${activeService}-${activePost}-${activePortfolioItem}`} className={isExiting ? 'animate-fade-out' : 'animate-fade-in'}>
            {renderPage()}
          </div>
        </main>
        <Footer setPage={navigateTo} />
      </div>
      <CookieConsentBanner setPage={navigateTo} />
      <BackToTopButton />
    </div>
  );
};

export default App;
