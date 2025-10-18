
// 2025-10-18: Blog URLs refactored, numeric prefixes removed, slugs used for routing, redirects added for SEO
import { useEffect, useState, useCallback } from 'react';
import { View } from '../App';
import { getAllBlogSlugs, getSlugFromOldId } from '../services/blogService';


export const useRouting = () => {
  const [view, setView] = useState<View>('services');
  const [blogSlug, setBlogSlug] = useState<string | null>(null);
  const [isValidRoute, setIsValidRoute] = useState<boolean>(true);

  // Helper: returns true if string is a valid blog slug
  const isValidBlogSlug = useCallback((slug: string) => getAllBlogSlugs().includes(slug), []);

  // Helper: returns slug for old numeric blog id (if exists)
  const getRedirectSlug = useCallback((idStr: string) => getSlugFromOldId(idStr), []);

  const parseHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    const [path, param] = hash.split('/');
    const validViews: View[] = ['blog', 'services', 'pricing', 'references', 'about'];
    if (validViews.includes(path as View)) {
      const newView = path as View;
      if (newView === 'blog' && param) {
        // If param is a valid slug, use it
        if (isValidBlogSlug(param)) {
          setView('blog');
          setBlogSlug(param);
          setIsValidRoute(true);
        } else if (/^\d+/.test(param)) {
          // If param is old numeric id, redirect to slug
          const redirectSlug = getRedirectSlug(param);
          if (redirectSlug) {
            window.location.hash = `#blog/${redirectSlug}`;
            return;
          } else {
            setView('blog');
            setBlogSlug(null);
            setIsValidRoute(false);
          }
        } else {
          setView('blog');
          setBlogSlug(null);
          setIsValidRoute(false);
        }
      } else {
        setView(newView);
        setBlogSlug(null);
        setIsValidRoute(true);
      }
    } else {
      setView('services');
      setBlogSlug(null);
      setIsValidRoute(false);
    }
    window.scrollTo(0, 0);
  }, [isValidBlogSlug, getRedirectSlug]);


  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);


  // New: navigate using slug for blog, else as before
  const navigate = useCallback((v: View, slug?: string) => {
    const hash = slug ? `#${v}/${slug}` : `#${v}`;
    window.location.hash = hash;
  }, []);

  // Handle back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      parseHash();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseHash]);

  return { view, blogSlug, isValidRoute, navigate };
};
