import { activeTheme, themes, Theme as ThemeConfig } from '../theme/theme.config';

export type UserThemePreference = 'light' | 'dark' | 'auto';

const THEME_STORAGE_KEY = 'ui-theme-pref';

const resolveTheme = (pref: UserThemePreference): ThemeConfig => {
  if (pref === 'auto') {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return themes['Vibrant Viandmo Dark'] || activeTheme;
    }
    return activeTheme;
  }
  if (pref === 'dark') return themes['Vibrant Viandmo Dark'] || activeTheme;
  return activeTheme; // light fallback
};

const generateThemeCss = (theme: ThemeConfig): string => {
  const colorVariables = Object.entries(theme.colors)
    .map(([key, value]) => `      ${key}: ${value};`)
    .join('\n');

  const semanticVariables = theme.semantic ? Object.entries(theme.semantic)
    .map(([k,v]) => `      --color-${k}: ${v};`)
    .join('\n') : '';

  const spacingVariables = theme.spacing ? Object.entries(theme.spacing)
    .map(([k,v]) => `      --space-${k}: ${v};`)
    .join('\n') : '';

  const radiusVariables = theme.radius ? Object.entries(theme.radius)
    .map(([k,v]) => `      --radius-${k}: ${v};`)
    .join('\n') : '';

  const motionVariables = theme.motion ? Object.entries(theme.motion)
    .map(([k,v]) => `      --motion-${k}: ${v};`)
    .join('\n') : '';
    
  const shadowVariables = Object.entries(theme.shadows)
    .map(([key, value]) => `      ${key}: ${value};`)
    .join('\n');

  return `
    :root {
${colorVariables}
${semanticVariables}
${shadowVariables}
${spacingVariables}
${radiusVariables}
${motionVariables}
    }

    /* Enhanced WhatsApp Icon Style */
    .wa-icon-link .wa-bg {
        fill: #25D366; /* Official WhatsApp Green */
        transition: fill 0.2s ease-in-out;
    }
    .wa-icon-link .wa-icon {
        fill: rgb(var(--white));
    }
    .wa-icon-link:hover .wa-bg,
    .wa-icon-link:focus-visible .wa-bg {
        fill: rgb(var(--accent));
    }
    
    /* Enhanced Facebook Icon Style */
    .fb-icon-link .fb-bg {
        fill: #1877F2; /* Official Facebook Blue */
        transition: fill 0.2s ease-in-out;
    }
    .fb-icon-link .fb-icon {
        fill: rgb(var(--white));
    }
    .fb-icon-link:hover .fb-bg,
    .fb-icon-link:focus-visible .fb-bg {
        fill: rgb(var(--accent));
    }

    /* Halftone Pattern Overlay */
    .halftone-overlay {
        position: relative;
        overflow: hidden;
    }
    .halftone-overlay::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background-image: radial-gradient(rgb(var(--text-primary)) 15%, transparent 16%);
        background-size: 6px 6px;
        opacity: ${theme.effects.halftoneOpacity};
    }

    /* Duotone Image Effect Wrapper */
    .duotone-wrapper {
      position: relative;
      background-color: rgb(var(--accent)); /* Teal */
      overflow: hidden;
    }
    .duotone-wrapper img {
      filter: grayscale(100%) contrast(1.1);
      mix-blend-mode: screen;
      opacity: ${theme.effects.duotoneOpacity};
    }

    /* Global Typography & Rendering */
    html {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      font-optical-sizing: auto;
    }

    ::selection {
      background-color: rgb(var(--primary));
      color: rgb(var(--on-primary));
    }

    body {
      font-family: ${theme.fonts.sans};
      font-feature-settings: ${theme.fonts.fontFeatureSettings};
    }

    /* Dark mode auto support (prefers-color-scheme) if dark variant exists */
    @media (prefers-color-scheme: dark) {
      :root[data-theme-auto='true'] {
        /* Could dynamically swap to dark theme if implemented */
      }
    }
    
    .faq-answer {
      transition: grid-template-rows 0.3s ease-out;
    }
  `;
};

const applyTheme = (pref: UserThemePreference = 'light'): void => {
  const themeObj = resolveTheme(pref);
  const themeCss = generateThemeCss(themeObj);
  let styleElement = document.getElementById('app-theme');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'app-theme';
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = themeCss;
  document.documentElement.dataset.theme = pref;
  if (pref === 'auto') {
    document.documentElement.dataset.themeAuto = 'true';
  } else {
    delete document.documentElement.dataset.themeAuto;
  }
};

export const initTheme = (): UserThemePreference => {
  let stored: UserThemePreference | null = null;
  if (typeof window !== 'undefined') {
    stored = (localStorage.getItem(THEME_STORAGE_KEY) as UserThemePreference) || null;
  }
  const pref: UserThemePreference = stored || 'light';
  applyTheme(pref);
  return pref;
};

export const setUserTheme = (pref: UserThemePreference) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, pref);
  }
  applyTheme(pref);
};

export const themeService = {
  applyTheme,
  initTheme,
  setUserTheme,
};