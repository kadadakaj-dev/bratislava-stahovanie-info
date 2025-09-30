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

/**
 * Tracks a page view event.
 * @param pageName The name of the page being viewed (e.g., 'Services', 'Blog Post').
 * @param path The URL path for the page (e.g., '/#services', '/#blog/1').
 */
const trackPageView = (pageName: string, path: string): void => {
  // This is disabled for production. 
  // Replace with a real analytics provider call if needed.
};

/**
 * Tracks a custom event.
 * @param eventName A descriptive name for the event (e.g., 'click_cta').
 * @param properties An object with additional data about the event.
 */
const trackEvent = (eventName: string, properties: Record<string, any> = {}): void => {
  // Placeholder: send to console for now (can integrate Plausible, GA4, etc.)
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', eventName, properties);
  } else {
    // No-op for production until a real provider is integrated.
  }
};

export const analyticsService = {
  trackPageView,
  trackEvent,
};