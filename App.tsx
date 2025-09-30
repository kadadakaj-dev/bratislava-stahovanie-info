import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { analyticsService } from './services/analyticsService';
import { sk } from './locales/sk';
import { en } from './locales/en';
import { themeService } from './services/themeService';
import { useRouting } from './hooks/useRouting';
import { useOfflineQueue } from './hooks/useOfflineQueue';
import { useSeoSync } from './hooks/useSeoSync';
import { useFocusHeading } from './hooks/useFocusHeading';
import { ErrorBoundary } from './components/ErrorBoundary';

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
  
  const { view: currentView, postId: selectedPostId, navigate } = useRouting();

  const t = useMemo(() => translations[locale], [locale]);

  useEffect(() => {
    themeService.applyTheme();
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);
  
  useSeoSync(currentView, selectedPostId, t);
  useOfflineQueue();
  useFocusHeading([currentView, selectedPostId]);

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

  const handleNavigate = (view: View) => navigate(view);

  const renderContent = () => {
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
            {renderContent()}
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer t={t} />
    </div>
  );
}

export default App;