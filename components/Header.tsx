import React, { useState, useEffect, useRef } from 'react';
import { Theme } from '../types';
import ThemeToggle from './ThemeToggle';
import { VMLogo, MenuIcon, XIcon } from '../constants';
import { Locale, Translations, View } from '../App';
import { analyticsService } from '../services/analyticsService';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  onNavigate: (view: View) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  currentView: View;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle, onNavigate, locale, setLocale, t, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    if (isMenuOpen) {
      const focusableElements = menuRef.current?.querySelectorAll('button');
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            setIsMenuOpen(false);
          }
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        };

        const menuNode = menuRef.current;
        menuNode?.addEventListener('keydown', handleKeyDown);
        firstElement.focus();

        return () => {
          menuNode?.removeEventListener('keydown', handleKeyDown);
          openButtonRef.current?.focus();
        };
      }
    }

    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);
  
  const handleNavClick = (view: View) => {
    analyticsService.trackEvent('navigate', { target: view, location: 'header' });
    onNavigate(view);
    setIsMenuOpen(false);
  };
  
  const handleMobileNavClick = (view: View) => {
    analyticsService.trackEvent('navigate', { target: view, location: 'mobile_menu' });
    onNavigate(view);
    setIsMenuOpen(false);
  };
  
  const handleLocaleToggle = () => {
      const newLocale = locale === 'sk' ? 'en' : 'sk';
      analyticsService.trackEvent('toggle_language', { to_locale: newLocale });
      setLocale(newLocale);
  };
  
  const handleThemeToggleWithAnalytics = () => {
      analyticsService.trackEvent('toggle_theme', { to_theme: theme === 'light' ? 'dark' : 'light' });
      onThemeToggle();
  };


  const navLinkClasses = "font-bold px-3 py-1.5 rounded-md transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-1";
  const activeLinkClasses = "bg-primary text-on-primary";
  const inactiveLinkClasses = "text-text-primary hover:bg-surface-2";
  
  const mobileNavLinkClasses = "text-3xl font-bold rounded-md transition-colors duration-200 p-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-1";

  return (
    <header className="bg-surface-1/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => handleNavClick('services')} 
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={t.backToHomeAria}
          >
            <VMLogo className="w-10 h-10 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors">
              VI&MO
            </h1>
          </button>
          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden md:flex items-center gap-1 md:gap-2">
                <button onClick={() => handleNavClick('about')} className={`${navLinkClasses} ${currentView === 'about' ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'about' ? 'page' : undefined}>
                    {t.about}
                </button>
                <button onClick={() => handleNavClick('services')} className={`${navLinkClasses} ${currentView === 'services' ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'services' ? 'page' : undefined}>
                    {t.services}
                </button>
                <button onClick={() => handleNavClick('pricing')} className={`${navLinkClasses} ${currentView === 'pricing' ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'pricing' ? 'page' : undefined}>
                    {t.pricing}
                </button>
                 <button onClick={() => handleNavClick('references')} className={`${navLinkClasses} ${currentView === 'references' ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'references' ? 'page' : undefined}>
                    {t.referencie}
                </button>
                <button onClick={() => handleNavClick('blog')} className={`${navLinkClasses} ${currentView === 'blog' ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'blog' ? 'page' : undefined}>
                    {t.blog}
                </button>
            </nav>
            <div className="w-px h-6 bg-border hidden md:block"></div>
             <button
              onClick={handleLocaleToggle}
              className="p-2 w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-md bg-surface-2 text-sm font-bold text-text-primary hover:bg-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface-1 focus:ring-ring"
              aria-label={t.toggleLanguageAria}
            >
              {locale.toUpperCase()}
            </button>
            <ThemeToggle theme={theme} onToggle={handleThemeToggleWithAnalytics} t={t} />
            <div className="md:hidden">
                <button
                    ref={openButtonRef}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-text-primary hover:bg-surface-2"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                    aria-label={t.toggleMenuAria}
                >
                    {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-surface-1/95 backdrop-blur-xl transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8" role="menu">
           <button
            onClick={() => handleMobileNavClick('about')}
            className={`${mobileNavLinkClasses} ${currentView === 'about' ? 'text-primary' : 'text-text-primary'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'about' ? 'page' : undefined}
            role="menuitem"
          >
            {t.about}
          </button>
          <button
            onClick={() => handleMobileNavClick('services')}
            className={`${mobileNavLinkClasses} ${currentView === 'services' ? 'text-primary' : 'text-text-primary'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'services' ? 'page' : undefined}
            role="menuitem"
          >
            {t.services}
          </button>
          <button
            onClick={() => handleMobileNavClick('pricing')}
            className={`${mobileNavLinkClasses} ${currentView === 'pricing' ? 'text-primary' : 'text-text-primary'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'pricing' ? 'page' : undefined}
            role="menuitem"
          >
            {t.pricing}
          </button>
           <button
            onClick={() => handleMobileNavClick('references')}
            className={`${mobileNavLinkClasses} ${currentView === 'references' ? 'text-primary' : 'text-text-primary'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'references' ? 'page' : undefined}
            role="menuitem"
          >
            {t.referencie}
          </button>
          <button
            onClick={() => handleMobileNavClick('blog')}
            className={`${mobileNavLinkClasses} ${currentView === 'blog' ? 'text-primary' : 'text-text-primary'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'blog' ? 'page' : undefined}
            role="menuitem"
          >
            {t.blog}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;