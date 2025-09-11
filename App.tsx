import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { offlineService } from './services/offlineService';
import { seoService } from './services/seoService';
import { analyticsService } from './services/analyticsService';
import { sk } from './locales/sk';
import { en } from './locales/en';
import { getPostById } from './services/blogService';
import { themeService } from './services/themeService';

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
const Chatbot = lazy(() => import('./components/chatbot/Chatbot'));

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
  
  const [currentView, setCurrentView] = useState<View>('services');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const t = useMemo(() => translations[locale], [locale]);

  useEffect(() => {
    themeService.applyTheme();
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);
  
  // Hash-based routing
  useEffect(() => {
    const parseHash = () => {
        const hash = window.location.hash.slice(1);
        const [path, idStr] = hash.split('/');

        const validViews: View[] = ['blog', 'services', 'pricing', 'references', 'about'];

        if (validViews.includes(path as View)) {
            const newView = path as View;
            const newPostId = (newView === 'blog' && idStr && !isNaN(parseInt(idStr))) ? parseInt(idStr) : null;
            
            setCurrentView(newView);
            setSelectedPostId(newPostId);
        } else {
            // Default to services if hash is invalid or empty
            setCurrentView('services');
            setSelectedPostId(null);
        }
        window.scrollTo(0, 0);
    };

    parseHash(); // Parse on initial load
    window.addEventListener('hashchange', parseHash);
    return () => {
        window.removeEventListener('hashchange', parseHash);
    };
  }, []);

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
  
  const handleNavigate = (view: View) => {
    window.location.hash = `#${view}`;
  };

  const renderContent = () => {
    if (currentView === 'blog' && selectedPostId !== null) {
      return <PostDetail postId={selectedPostId} t={t} />;
    }

    switch(currentView) {
        // FIX: Pass required 'onNavigate' prop to ServicesPage.
        case 'services': return <ServicesPage t={t} onNavigate={handleNavigate} />;
        case 'pricing': return <PricingPage t={t} />;
        case 'references': return <ReferencesPage t={t} />;
        case 'about': return <AboutPage t={t} />;
        case 'blog': return <PostList t={t} />;
        // FIX: Pass required 'onNavigate' prop to ServicesPage.
        default: return <ServicesPage t={t} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-surface-1 text-text-primary min-h-screen flex flex-col transition-colors duration-300">
      <a href="#main-content" className="absolute z-[9999] -translate-y-full focus:translate-y-0 p-3 bg-primary text-on-primary font-bold transition-transform duration-300">
        {t.skipToContent}
      </a>
      {/* FIX: Pass selectedPostId to Header component. */}
      <Header 
        locale={locale}
        setLocale={setLocale}
        t={t}
        currentView={currentView}
        selectedPostId={selectedPostId}
      />
      <main id="main-content" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Suspense fallback={<LoadingSpinner />}>
          {renderContent()}
        </Suspense>
      </main>
      <Footer t={t} />
      <Suspense fallback={null}>
        <Chatbot t={t} />
      </Suspense>
    </div>
  );
}

export default App;
