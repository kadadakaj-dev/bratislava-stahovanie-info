// Simple prefetch utility for route-linked components & data.
// Uses dynamic import for known lazy components and optionally fetches JSON/data endpoints.

interface PrefetchTarget {
  type: 'component' | 'data';
  key: string;
  action: () => Promise<unknown>;
}

const registry: Record<string, PrefetchTarget> = {
  services: {
    type: 'component',
    key: 'services',
    action: () => import('../components/ServicesPage'),
  },
  pricing: {
    type: 'component',
    key: 'pricing',
    action: () => import('../components/PricingPage'),
  },
  references: {
    type: 'component',
    key: 'references',
    action: () => import('../components/ReferencesPage'),
  },
  about: {
    type: 'component',
    key: 'about',
    action: () => import('../components/AboutPage'),
  },
  blog: {
    type: 'component',
    key: 'blog',
    action: () => import('../components/PostList'),
  },
};

const prefetched = new Set<string>();

export const prefetch = (key: string) => {
  if (prefetched.has(key)) return;
  const target = registry[key];
  if (!target) return;
  target.action().catch(() => {/* ignore */});
  prefetched.add(key);
};

// Prefetch on idle to warm a minimal set (e.g. most common next routes)
export const scheduleIdlePrefetch = (keys: string[]) => {
  if (typeof window === 'undefined') return;
  const idle = (cb: () => void) => 'requestIdleCallback' in window ? (window as any).requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 800);
  idle(() => keys.forEach(prefetch));
};
