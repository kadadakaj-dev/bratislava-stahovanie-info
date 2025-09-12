import React, { useState, useEffect, useRef } from 'react';
import { VMLogo, MenuIcon, XIcon, FacebookIcon, WhatsAppIcon, InformationCircleIcon, RectangleStackIcon, TagIcon, UserGroupIcon, BookOpenIcon } from '../constants';
import { Locale, Translations, View } from '../App';
import { analyticsService } from '../services/analyticsService';

interface HeaderProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  currentView: View;
  selectedPostId: number | null;
}

const Header: React.FC<HeaderProps> = ({ locale, setLocale, t, currentView, selectedPostId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    if (isMenuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'button, [href]'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
        if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      const menuNode = menuRef.current;
      menuNode.addEventListener('keydown', handleKeyDown);
      firstElement.focus();

      return () => {
        menuNode.removeEventListener('keydown', handleKeyDown);
        if (document.body.contains(openButtonRef.current)) {
           openButtonRef.current?.focus();
        }
        document.body.style.overflow = '';
      };
    }
  }, [isMenuOpen]);
  
  const handleLocaleToggle = () => {
      const newLocale = locale === 'sk' ? 'en' : 'sk';
      analyticsService.trackEvent('toggle_language', { to_locale: newLocale });
      setLocale(newLocale);
  };

  const navLinkClasses = "font-bold px-3 py-1.5 rounded-md transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-1";
  const activeLinkClasses = "bg-primary text-on-primary";
  const inactiveLinkClasses = "text-text-primary hover:bg-surface-2";

  const navItems = [
    { href: '#about', text: t.about, icon: <InformationCircleIcon className="w-6 h-6" />, view: 'about' },
    { href: '#services', text: t.services, icon: <RectangleStackIcon className="w-6 h-6" />, view: 'services' },
    { href: '#pricing', text: t.pricing, icon: <TagIcon className="w-6 h-6" />, view: 'pricing' },
    { href: '#references', text: t.referencie, icon: <UserGroupIcon className="w-6 h-6" />, view: 'references' },
    { href: '#blog', text: t.blog, icon: <BookOpenIcon className="w-6 h-6" />, view: 'blog' },
  ];

  return (
    <>
      <header className="bg-surface-1/80 backdrop-blur-md sticky top-0 z-30 transition-colors duration-300 border-b border-border">
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
                      onClick={() => setIsMenuOpen(true)}
                      className="p-2 rounded-md text-text-primary hover:bg-surface-2"
                      aria-controls="mobile-menu"
                      aria-expanded={isMenuOpen}
                      aria-label={t.toggleMenuAria}
                  >
                      <MenuIcon className="w-6 h-6" />
                  </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Off-canvas Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${isMenuOpen ? '' : 'pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
        
        {/* Panel */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-full max-w-xs bg-surface-1 shadow-xl flex flex-col transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Panel Header */}
          <header className="flex items-center justify-between p-4 border-b border-border">
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 group focus:outline-none">
              <VMLogo className="w-8 h-8 text-primary" />
              <span id="mobile-menu-title" className="font-bold text-text-primary group-hover:text-accent">VI&MO</span>
            </a>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-text-primary hover:bg-surface-2"
              aria-label={t.toggleMenuAria}
            >
              <XIcon className="w-6 h-6" />
            </button>
          </header>

          {/* Navigation */}
          <nav className="flex-grow p-4 space-y-2">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 p-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${currentView === item.view ? 'bg-accent/10 text-accent' : 'text-text-primary hover:bg-surface-2'}`}
                aria-current={currentView === item.view ? 'page' : undefined}
              >
                {item.icon}
                <span>{item.text}</span>
              </a>
            ))}
          </nav>

          {/* Panel Footer */}
          <footer className="p-4 space-y-4 border-t border-border">
            <button
                onClick={handleLocaleToggle}
                className="w-full p-3 flex items-center justify-center rounded-md bg-surface-2 text-sm font-bold text-text-primary hover:bg-border transition-colors duration-200"
                aria-label={t.toggleLanguageAria}
              >
                {locale === 'sk' ? 'Switch to English' : 'Prepnúť na Slovenčinu'}
              </button>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.facebook.com/viandmocom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                onClick={() => setIsMenuOpen(false)}
                className="fb-icon-link rounded-md text-text-primary transition-transform duration-200 ease-in-out hover:-translate-y-px"
              >
                <FacebookIcon className="w-8 h-8" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=421911275755"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
                onClick={() => setIsMenuOpen(false)}
                className="wa-icon-link rounded-md text-text-primary transition-transform duration-200 ease-in-out hover:-translate-y-px"
              >
                <WhatsAppIcon className="w-8 h-8" />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Header;