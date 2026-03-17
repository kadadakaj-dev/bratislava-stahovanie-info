import { useEffect } from 'react';
import { logAnalyticsEvent } from '../services/analyticsService';

interface SlowImageOptions {
  thresholdMs?: number; // default 2500ms
  sampleRatio?: number; // optional further sampling to reduce noise
}

// Observes <img> elements added to DOM and measures load time; emits image_load_slow if above threshold
export const useSlowImages = ({ thresholdMs = 2500, sampleRatio = 1 }: SlowImageOptions = {}) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const perfObserverSupported = 'PerformanceObserver' in window;

    const seen = new Set<string>();

    const shouldSample = () => sampleRatio >= 1 || Math.random() < sampleRatio;

    const emit = (img: HTMLImageElement, duration: number) => {
      if (!shouldSample()) return;
      const src = img.currentSrc || img.src;
      if (!src || seen.has(src)) return; // avoid duplicates for same resource
      seen.add(src);
      logAnalyticsEvent('image_load_slow', {
        src: src.split('?')[0],
        time_to_load: Math.round(duration),
        natural_w: img.naturalWidth,
        natural_h: img.naturalHeight,
      });
    };

    // Fallback: attach listeners to existing images
    const watchImage = (img: HTMLImageElement) => {
      if (img.complete) {
        // Already loaded; approximate via performance entries if any
        return;
      }
      const start = performance.now();
      const timeout = window.setTimeout(() => {
        if (!img.complete) {
          emit(img, performance.now() - start);
        }
      }, thresholdMs);
      const onLoad = () => {
        clearTimeout(timeout);
        const dur = performance.now() - start;
        if (dur >= thresholdMs) emit(img, dur);
      };
      img.addEventListener('load', onLoad, { once: true });
    };

    document.querySelectorAll('img').forEach(img => watchImage(img as HTMLImageElement));

    // MutationObserver for new images
    const mo = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node instanceof HTMLImageElement) {
            watchImage(node);
          } else if (node instanceof HTMLElement) {
            node.querySelectorAll('img').forEach(img => watchImage(img as HTMLImageElement));
          }
        });
      });
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    // PerformanceObserver (resource timing) for more accuracy if available
    let po: PerformanceObserver | null = null;
    if (perfObserverSupported) {
      try {
        po = new PerformanceObserver(list => {
          list.getEntries().forEach(entry => {
            const rt = entry as PerformanceResourceTiming;
            if ((rt as any).initiatorType === 'img' && rt.duration >= thresholdMs) {
              const name = rt.name;
              const matched = Array.from(document.images).find(i => (i.currentSrc || i.src).includes(name));
              if (matched) emit(matched, rt.duration);
            }
          });
        });
        po.observe({ type: 'resource', buffered: true });
      } catch {
        // ignore
      }
    }

    return () => {
      mo.disconnect();
      po?.disconnect();
    };
  }, [thresholdMs, sampleRatio]);
};

export default useSlowImages;
