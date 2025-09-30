import { useEffect } from 'react';

export const useFocusHeading = (deps: any[]) => {
  useEffect(() => {
    const h1 = document.querySelector('h1, h2');
    if (h1 instanceof HTMLElement) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: false });
      setTimeout(() => h1.removeAttribute('tabindex'), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
