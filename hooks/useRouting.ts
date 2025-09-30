import { useEffect, useState } from 'react';
import { View } from '../App';

export const useRouting = () => {
  const [view, setView] = useState<View>('services');
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.slice(1);
      const [path, idStr] = hash.split('/');
      const validViews: View[] = ['blog', 'services', 'pricing', 'references', 'about'];
      if (validViews.includes(path as View)) {
        const newView = path as View;
        const newPostId = newView === 'blog' && idStr && !isNaN(parseInt(idStr)) ? parseInt(idStr) : null;
        setView(newView);
        setPostId(newPostId);
      } else {
        setView('services');
        setPostId(null);
      }
      window.scrollTo(0, 0);
    };
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  return { view, postId, navigate: (v: View) => { window.location.hash = `#${v}`; } };
};
