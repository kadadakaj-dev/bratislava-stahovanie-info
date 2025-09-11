import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/chatbot/Chatbot'; // Import the new Chatbot component
import { Theme } from './types';
import { offlineService } from './services/offlineService';
import { seoService } from './services/seoService';
import { analyticsService } from './services/analyticsService';
import { sk } from './locales/sk';
import { en } from './locales/en';
import { getPostById } from './services/blogService';

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
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return Theme.Dark;
      }
    }
    return Theme.Light;
  });

  const [locale, setLocale] = useState<Locale>(() => {
     if (typeof window !== 'undefined' && window.localStorage) {
      const storedLocale = window.localStorage.getItem('locale') as Locale;
      return storedLocale || 'sk';
    }
    return 'sk';
  });
  
  const [currentView, setCurrentView] = useState<View>('services');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const t = useMemo(() => translations[locale], [locale]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.Dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);
  
  // Centralized SEO, Schema, and Page View Tracking
  useEffect(() => {
    const updateSeoAndTrackView = async () => {
      let post = null;
      let pageName = currentView.charAt(0).toUpperCase() + currentView.slice(1);
      let path = `/#${currentView}`;
      
      if (currentView === 'blog' && selectedPostId !== null) {
        post = await getPostById(selectedPostId);
        if (post) {
            pageName = `Blog Post: ${post.title}`;
            path = `/#blog/${post.id}`;
        }
      }
      
      seoService.updateSeoTags(currentView, t, post || undefined);
      analyticsService.trackPageView(pageName, path);
    };
    updateSeoAndTrackView();
  }, [currentView, selectedPostId, t]);

  useEffect(() => {
    offlineService.initDB().then(() => {
      console.log('Offline DB initialized.');
      if (navigator.onLine) {
        offlineService.processQueue();
      }
    });
  }, []);

  const handleThemeToggle = useCallback(() => {
    setTheme(prevTheme => (prevTheme === Theme.Light ? Theme.Dark : Theme.Light));
  }, []);

  const handleSelectPost = useCallback((id: number) => {
    setCurrentView('blog');
    setSelectedPostId(id);
    window.scrollTo(0, 0);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedPostId(null);
    setCurrentView('blog');
  }, []);
  
  const handleNavigate = useCallback((view: View) => {
    setSelectedPostId(null);
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);
  
  const renderContent = () => {
    if (currentView === 'services') {
      return <ServicesPage t={t} onNavigate={handleNavigate} />;
    }
    if (currentView === 'pricing') {
      return <PricingPage t={t} />;
    }
    if (currentView === 'references') {
        return <ReferencesPage t={t} />;
    }
    if (currentView === 'about') {
        return <AboutPage t={t} onNavigate={handleNavigate} />;
    }
    if (selectedPostId !== null) {
      return <PostDetail postId={selectedPostId} onBack={handleBackToList} t={t} />;
    }
    return <PostList onSelectPost={handleSelectPost} t={t} />;
  };

  return (
    <div className="bg-surface-1 text-text-primary min-h-screen flex flex-col transition-colors duration-300">
      <a href="#main-content" className="absolute z-[9999] -translate-y-full focus:translate-y-0 p-3 bg-primary text-on-primary font-bold transition-transform duration-300">
        {t.skipToContent}
      </a>
      <Header 
        theme={theme} 
        onThemeToggle={handleThemeToggle} 
        onNavigate={handleNavigate}
        locale={locale}
        setLocale={setLocale}
        t={t}
        currentView={currentView}
      />
      <main id="main-content" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Suspense fallback={<LoadingSpinner />}>
          {renderContent()}
        </Suspense>
      </main>
      <Footer t={t} onNavigate={handleNavigate}/>
      <Chatbot t={t} />
    </div>
  );
}

export default App;