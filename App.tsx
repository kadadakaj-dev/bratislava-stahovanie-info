import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { analyticsService, trackScroll75Once } from './services/analyticsService';
import { sk } from './locales/sk';
import { en } from './locales/en';
import { themeService } from './services/themeService';
import { useRouting } from './hooks/useRouting';
import { useOfflineQueue } from './hooks/useOfflineQueue';
import { useSeoSync } from './hooks/useSeoSync';
import { useFocusHeading } from './hooks/useFocusHeading';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSlowImages } from './hooks/useSlowImages';

const translations = { sk, en };

export type Locale = 'sk' | 'en';
export type Translations = typeof translations.sk;
export type View = 'blog' | 'services' | 'pricing' | 'references' | 'about';

// Lazy load page components for better performance
const PostList = lazy(() => import('./components/PostList'));
const PostDetail = lazy(() => import('./components/PostDetail'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const PricingPage = lazy(() => import('./components/PricingPage'));
const ReferencesPage = lazy(() => import('./components/ReferencesPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64" aria-label="Loading content">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>
);

function App() {
  const [locale, setLocale] = useState<Locale>(() => {
     if (typeof window !== 'undefined' && window.localStorage) {
      const storedLocale = window.localStorage.getItem('locale') as Locale;
      return storedLocale || 'sk';
    }
    return 'sk';
  });
  
  const { view: currentView, postId: selectedPostId, isValidRoute, navigate } = useRouting();

  const t = useMemo(() => translations[locale], [locale]);

  useEffect(() => {
    themeService.applyTheme();
  }, []);

  // Delegate click tracking for tel: links (click_call)
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (anchor) {
        analyticsService.trackEvent('click_call', {
          page: currentView,
          placement: anchor.dataset.placement || 'unknown'
        });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);
  
  useSeoSync(currentView, selectedPostId, t);
  useOfflineQueue();
  useFocusHeading([currentView, selectedPostId]);
  // Track slow-loading images globally
  useSlowImages({ thresholdMs: 2500, sampleRatio: 1 });

  // Centralized SEO, Schema, and Page View Tracking
  useEffect(() => {
    let pageName = currentView.charAt(0).toUpperCase() + currentView.slice(1);
    let path = `/#${currentView}`;
    if (currentView === 'blog' && selectedPostId) {
      pageName = `Blog Post ${selectedPostId}`;
      path = `/#blog/${selectedPostId}`;
    }
    analyticsService.trackPageView(pageName, path);
  }, [currentView, selectedPostId]);

  // Scroll depth 75% event once per view
  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrollPos / total >= 0.75) {
        trackScroll75Once(currentView);
        window.removeEventListener('scroll', handler);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [currentView]);

  const handleNavigate = (view: View) => navigate(view);

  const renderContent = () => {
    if (!isValidRoute) {
      return (
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-text-primary mb-4">{t.pageNotFound || 'Stránka nenájdená'}</h1>
          <p className="text-text-muted mb-8">{t.pageNotFoundDesc || 'Požadovaná stránka neexistuje.'}</p>
          <button onClick={() => navigate('services')} className="inline-block bg-primary text-on-primary font-bold px-6 py-3 rounded-md hover:brightness-110 transition-all duration-200">
            {t.backToHome || 'Späť na domov'}
          </button>
        </div>
      );
    }

    if (currentView === 'blog' && selectedPostId !== null) {
      return <PostDetail postId={selectedPostId} t={t} />;
    }

    switch(currentView) {
        case 'services': return <ServicesPage t={t} onNavigate={handleNavigate} />;
        case 'pricing': return <PricingPage t={t} />;
        case 'references': return <ReferencesPage t={t} />;
        case 'about': return <AboutPage t={t} />;
        case 'blog': return <PostList t={t} />;
        default: return <ServicesPage t={t} onNavigate={handleNavigate} />;
    }
  };



  return (
    <div className="bg-surface-1 text-text-primary min-h-screen flex flex-col transition-colors duration-300">
      <a href="#main-content" className="absolute z-[9999] -translate-y-full focus:translate-y-0 p-3 bg-primary text-on-primary font-bold transition-transform duration-300">
        {t.skipToContent}
      </a>
      <Header 
        locale={locale}
        setLocale={setLocale}
        t={t}
        currentView={currentView}
        selectedPostId={selectedPostId}
      />
      <main id="main-content" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer t={t} />
    </div>
  );
}

export default App;