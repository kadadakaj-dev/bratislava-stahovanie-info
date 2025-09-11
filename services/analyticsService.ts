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
  console.log(`%c[Analytics] Page View: %c${pageName}`, 'color: #008980; font-weight: bold;', 'color: inherit;', { path });
  // Production implementation example:
  // window.gtag('event', 'page_view', { page_title: pageName, page_path: path });
  // window.plausible('pageview');
};

/**
 * Tracks a custom event.
 * @param eventName A descriptive name for the event (e.g., 'click_cta').
 * @param properties An object with additional data about the event.
 */
const trackEvent = (eventName: string, properties: Record<string, any> = {}): void => {
  console.log(`%c[Analytics] Event: %c${eventName}`, 'color: #35D86D; font-weight: bold;', 'color: inherit;', properties);
  // Production implementation example:
  // window.gtag('event', eventName, properties);
  // window.plausible(eventName, { props: properties });
};

export const analyticsService = {
  trackPageView,
  trackEvent,
};
