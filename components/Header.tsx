import React, { useState, useEffect, useRef } from 'react';
import { VMLogo, MenuIcon, XIcon, FacebookIcon, WhatsAppIcon } from '../constants';
import { Locale, Translations, View } from '../App';
import { analyticsService } from '../services/analyticsService';

interface HeaderProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  currentView: View;
  // FIX: Add selectedPostId to props to determine active blog link state.
  selectedPostId: number | null;
}

const Header: React.FC<HeaderProps> = ({ locale, setLocale, t, currentView, selectedPostId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    if (isMenuOpen) {
      const focusableElements = menuRef.current?.querySelectorAll('a');
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
  
  const handleLocaleToggle = () => {
      const newLocale = locale === 'sk' ? 'en' : 'sk';
      analyticsService.trackEvent('toggle_language', { to_locale: newLocale });
      setLocale(newLocale);
  };

  const navLinkClasses = "font-bold px-3 py-1.5 rounded-md transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-1";
  const activeLinkClasses = "bg-primary text-on-primary";
  const inactiveLinkClasses = "text-text-primary hover:bg-surface-2";
  
  const mobileNavLinkClasses = "text-3xl font-bold rounded-md transition-colors duration-200 p-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-1";

  return (
    <header className="bg-surface-1/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a 
            href="#services"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={t.backToHomeAria}
          >
            <VMLogo className="w-10 h-10 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors">
              VI&MO
            </h1>
          </a>
          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden md:flex items-center gap-1 md:gap-2">
                <a href="#about" className={`${navLinkClasses} ${currentView === 'about' ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'about' ? 'page' : undefined}>
                    {t.about}
                </a>
                <a href="#services" className={`${navLinkClasses} ${currentView === 'services' ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'services' ? 'page' : undefined}>
                    {t.services}
                </a>
                <a href="#pricing" className={`${navLinkClasses} ${currentView === 'pricing' ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'pricing' ? 'page' : undefined}>
                    {t.pricing}
                </a>
                 <a href="#references" className={`${navLinkClasses} ${currentView === 'references' ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'references' ? 'page' : undefined}>
                    {t.referencie}
                </a>
                <a href="#blog" className={`${navLinkClasses} ${currentView === 'blog' && selectedPostId === null ? activeLinkClasses : inactiveLinkClasses}`} aria-current={currentView === 'blog' && selectedPostId === null ? 'page' : undefined}>
                    {t.blog}
                </a>
            </nav>
            <div className="w-px h-6 bg-border hidden md:block"></div>
             <button
              onClick={handleLocaleToggle}
              className="p-2 w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-md bg-surface-2 text-sm font-bold text-text-primary hover:bg-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface-1 focus:ring-ring"
              aria-label={t.toggleLanguageAria}
            >
              {locale.toUpperCase()}
            </button>
            <a
              href="https://www.facebook.com/viandmocom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="fb-icon-link rounded-md text-text-primary transition-transform duration-200 ease-in-out hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
            >
              <FacebookIcon className="w-9 h-9" />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=421911275755"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              className="wa-icon-link rounded-md text-text-primary transition-transform duration-200 ease-in-out hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
            >
              <WhatsAppIcon className="w-9 h-9" />
            </a>
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
        className={`md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-text-primary transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8" role="menu">
           <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className={`${mobileNavLinkClasses} ${currentView === 'about' ? 'text-primary' : 'text-surface-1'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'about' ? 'page' : undefined}
            role="menuitem"
          >
            {t.about}
          </a>
          <a
            href="#services"
            onClick={() => setIsMenuOpen(false)}
            className={`${mobileNavLinkClasses} ${currentView === 'services' ? 'text-primary' : 'text-surface-1'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'services' ? 'page' : undefined}
            role="menuitem"
          >
            {t.services}
          </a>
          <a
            href="#pricing"
            onClick={() => setIsMenuOpen(false)}
            className={`${mobileNavLinkClasses} ${currentView === 'pricing' ? 'text-primary' : 'text-surface-1'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'pricing' ? 'page' : undefined}
            role="menuitem"
          >
            {t.pricing}
          </a>
           <a
            href="#references"
            onClick={() => setIsMenuOpen(false)}
            className={`${mobileNavLinkClasses} ${currentView === 'references' ? 'text-primary' : 'text-surface-1'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'references' ? 'page' : undefined}
            role="menuitem"
          >
            {t.referencie}
          </a>
          <a
            href="#blog"
            onClick={() => setIsMenuOpen(false)}
            className={`${mobileNavLinkClasses} ${currentView === 'blog' ? 'text-primary' : 'text-surface-1'}`}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={currentView === 'blog' ? 'page' : undefined}
            role="menuitem"
          >
            {t.blog}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
