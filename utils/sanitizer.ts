/**
 * Sanitizes HTML content to prevent XSS attacks.
 * In a real-world application, this should use a robust library like DOMPurify.
 * This is a basic simulation for demonstration purposes.
 * @param dirtyHtml The potentially unsafe HTML string.
 * @returns The sanitized HTML string.
 */
export const sanitizeHtml = (dirtyHtml: string): string => {
  // A very basic simulation: remove script tags.
  // NOTE: This is NOT a secure way to prevent XSS. Use a dedicated library.
  const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  return dirtyHtml.replace(scriptRegex, '');
};
