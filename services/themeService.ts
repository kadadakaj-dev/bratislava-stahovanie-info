import { activeTheme, Theme } from '../theme/theme.config';

const generateThemeCss = (theme: Theme): string => {
  const colorVariables = Object.entries(theme.colors)
    .map(([key, value]) => `      ${key}: ${value};`)
    .join('\n');
    
  const shadowVariables = Object.entries(theme.shadows)
    .map(([key, value]) => `      ${key}: ${value};`)
    .join('\n');

  return `
    :root {
${colorVariables}
${shadowVariables}
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
    
    .faq-answer {
      transition: grid-template-rows 0.3s ease-out;
    }
  `;
};

const applyTheme = (): void => {
  const themeCss = generateThemeCss(activeTheme);
  let styleElement = document.getElementById('app-theme');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'app-theme';
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = themeCss;
};

export const themeService = {
  applyTheme,
};