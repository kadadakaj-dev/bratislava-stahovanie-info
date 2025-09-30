/**
 * Mock Analytics Service
 * 
 * This service simulates a web analytics provider like Google Analytics or Plausible.
 * In a production environment, the implementation of these functions would be replaced
 * with calls to the actual analytics library's API.
 * 
 * This approach decouples the analytics logic from the components, making it easy
 * to switch providers without refactoring the entire application.
 */

// Basic event taxonomy definition for consistency
// EVENT CATEGORIES (implicit): navigation, interaction, performance, form, chatbot, system
// Example names: 'nav_page_view', 'cta_click', 'web_vital', 'form_submit', 'chatbot_open'
// Properties SHOULD be flat, primitive or small arrays.

export const ANALYTICS_VERSION = 1;

interface AnalyticsPayload {
  event: string;
  ts: number; // epoch ms
  v: number; // analytics schema version
  props?: Record<string, any>;
}

type Transport = (payload: AnalyticsPayload) => void;

// In future integrate real endpoint here
const consoleTransport: Transport = (payload) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', payload.event, payload.props || {});
  }
};

let customTransport: Transport | null = null;
export const setAnalyticsTransport = (t: Transport) => { customTransport = t; };

const emit = (event: string, props?: Record<string, any>) => {
  const payload: AnalyticsPayload = { event, ts: Date.now(), v: ANALYTICS_VERSION, props };
  (customTransport || consoleTransport)(payload);
};

/** Track a page view with normalized naming */
const trackPageView = (pageName: string, path: string): void => {
  emit('nav_page_view', { page: pageName, path });
};

/**
 * Tracks a custom event.
 * @param eventName A descriptive name for the event (e.g., 'click_cta').
 * @param properties An object with additional data about the event.
 */
const trackEvent = (eventName: string, properties: Record<string, any> = {}): void => {
  emit(eventName, properties);
};

export const analyticsService = {
  trackPageView,
  trackEvent,
};

// Convenience wrappers for standardized interaction events
export const trackScrollDepth = (depth: number, page: string) => {
  trackEvent('scroll_depth', { depth, page });
};

export const trackScroll75Once = (() => {
  let fired = false;
  return (page: string) => {
    if (fired) return;
    fired = true;
    trackEvent('scroll_75', { page, depth: 0.75 });
  };
})();

export const trackClickCall = (page: string, placement: string) => {
  trackEvent('click_call', { page, placement });
};

export const trackBlogToForm = (page: string, postId?: number) => {
  trackEvent('blog_to_form', { page, post_id: postId });
};

export const trackChatOpen = (page: string) => {
  trackEvent('chat_open', { page });
};

export const trackLeadMagnetDownload = (page: string, asset: string) => {
  trackEvent('lead_magnet_download', { page, asset });
};

// Helper specifically for Web Vitals events to keep naming consistent
export const trackWebVital = (metric: { name: string; value: number; id: string; rating?: string }) => {
  trackEvent('web_vital', {
    metric: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
  });
};