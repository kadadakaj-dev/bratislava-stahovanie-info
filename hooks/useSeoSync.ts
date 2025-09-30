import { useEffect } from 'react';
import { seoService } from '../services/seoService';
import { getPostById } from '../services/blogService';
import { Translations, View } from '../App';

export const useSeoSync = (view: View, postId: number | null, t: Translations) => {
  useEffect(() => {
    const run = async () => {
      let post = undefined;
      if (view === 'blog' && postId) {
        post = await getPostById(postId) || undefined;
      }
      seoService.updateSeoTags(view, t, post);
    };
    run();
  }, [view, postId, t]);
};
