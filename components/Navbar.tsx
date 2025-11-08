import React, { useState, useEffect } from 'react';
import { Page, Theme } from '../types';
import { SunIcon, MoonIcon, MenuIcon, XIcon, SearchIcon, PlusIcon } from './Icons';
import SearchModal from './SearchModal';
import Logo from './Logo';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page, id?: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const NavLink: React.FC<{ pageName: Page; currentPage: Page; setPage: (page: Page) => void; onClick?: () => void; isMobile?: boolean; }> = ({ pageName, currentPage, setPage, onClick, isMobile }) => (
  <button
    onClick={() => { setPage(pageName); if(onClick) onClick(); }}
    className={
      isMobile 
      ? `w-full text-left px-4 py-3 text-lg font-medium rounded-md ${
          currentPage === pageName
          ? 'text-primary dark:text-accent bg-primary/10 dark:bg-primary/20'
          : 'text-text_light dark:text-text_dark hover:text-primary dark:hover:text-accent hover:bg-border_light dark:hover:bg-border_dark'
        }`
      : `px-4 py-2 rounded-md text-sm font-medium ${
          currentPage === pageName
            ? 'font-semibold text-primary dark:text-white bg-primary/10 dark:bg-primary/20'
            : 'text-subtext_light dark:text-subtext_dark hover:text-text_light dark:hover:text-text_dark hover:bg-border_light/50 dark:hover:bg-border_dark/50'
        }`
    }
  >
    {pageName}
  </button>
);

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const navItems: Page[] = ['Home', 'Services', 'Pricing', 'Portfolio', 'Blog', 'Careers', 'About', 'Contact'];
  
  const handleStartProjectClick = () => {
    setPage('Contact');
    setIsOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-lg ${
        isScrolled
          ? 'bg-surface_light/80 dark:bg-surface_dark/80 shadow-md'
          : 'bg-surface_light/70 dark:bg-surface_dark/30 border-b border-border_light dark:border-border_dark'
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo setPage={setPage} isScrolled={isScrolled} />
            </div>
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map(item => <NavLink key={item} pageName={item} currentPage={currentPage} setPage={setPage} />)}
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-subtext_light dark:text-subtext_dark hover:text-text_light dark:hover:text-text_dark hover:bg-border_light/50 dark:hover:bg-border_dark/50 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-bg_dark focus:ring-offset-bg_light focus:ring-primary mr-2"
                aria-label="Search"
              >
                <SearchIcon className="h-6 w-6" />
              </button>
              <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-subtext_light dark:text-subtext_dark hover:text-text_light dark:hover:text-text_dark hover:bg-border_light/50 dark:hover:bg-border_dark/50 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-bg_dark focus:ring-offset-bg_light focus:ring-primary mr-2"
                  aria-label="Toggle theme"
              >
                <span className="relative h-6 w-6 inline-flex items-center justify-center overflow-hidden">
                  <SunIcon className={`h-6 w-6 transition-all duration-500 ease-in-out transform ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} />
                  <MoonIcon className={`h-6 w-6 absolute transition-all duration-500 ease-in-out transform ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'}`} />
                </span>
              </button>
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-md text-subtext_light dark:text-subtext_dark hover:text-text_light dark:hover:text-text_dark hover:bg-border_light/50 dark:hover:bg-border_dark/50"
                  aria-label="Open menu"
                  aria-expanded={isOpen}
                >
                  <MenuIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-xs transform bg-surface_light dark:bg-surface_dark shadow-xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border_light dark:border-border_dark">
            <Logo setPage={setPage} />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-subtext_light dark:text-subtext_dark hover:bg-border_light dark:hover:bg-border_dark"
              aria-label="Close menu"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => (
               <div 
                key={item}
                className="will-change-transform"
                style={isOpen ? {
                  animation: 'fadeInUp 0.5s ease-out forwards',
                  animationDelay: `${100 + index * 50}ms`,
                  opacity: 0
                } : {}}
              >
                <NavLink pageName={item} currentPage={currentPage} setPage={setPage} onClick={() => setIsOpen(false)} isMobile />
              </div>
            ))}
          </nav>
          <div className="p-4 border-t border-border_light dark:border-border_dark">
            <button
                onClick={handleStartProjectClick}
                className="w-full flex h-12 items-center justify-center gap-2 rounded-lg bg-primary text-white font-bold text-base shadow-lg shadow-primary/40 transition-all duration-300 transform hover:scale-105 hover:bg-purple-600"
            >
                <PlusIcon className="h-6 w-6" />
                <span>Start Your Project</span>
            </button>
          </div>
        </div>
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} navigateTo={setPage} />
    </>
  );
};

export default Navbar;