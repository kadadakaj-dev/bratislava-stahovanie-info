export interface Theme {
  name: string;
  colors: {
    '--black': string;
    '--white': string;
    '--lime-viandmo': string;
    '--teal-viandmo': string;
    '--midnight-viandmo': string;
    '--surface-1': string;
    '--surface-2': string;
    '--text-primary': string;
    '--text-secondary': string;
    '--text-muted': string;
    '--primary': string;
    '--accent': string;
    '--on-primary': string;
    '--border': string;
    '--ring': string;
  };
  fonts: {
    sans: string;
    fontFeatureSettings: string;
  };
  shadows: {
    '--shadow-warhol': string;
    '--shadow-warhol-sm': string;
    '--shadow-glass': string;
  };
  effects: {
    halftoneOpacity: number;
    duotoneOpacity: number;
  };
}

const warhol4DX: Theme = {
  name: 'Warhol 4D-X',
  colors: {
    '--black': '0 0 0',
    '--white': '255 255 255',
    '--lime-viandmo': '53 216 109',
    '--teal-viandmo': '0 137 128',
    '--midnight-viandmo': '0 56 68',
    '--surface-1': 'var(--white)',
    '--surface-2': '247 247 247',
    '--text-primary': 'var(--midnight-viandmo)',
    '--text-secondary': 'var(--teal-viandmo)',
    '--text-muted': '0 56 68 / 0.72',
    '--primary': 'var(--lime-viandmo)',
    '--accent': 'var(--teal-viandmo)',
    '--on-primary': 'var(--black)',
    '--border': '0 56 68 / 0.12',
    '--ring': 'var(--lime-viandmo)',
  },
  fonts: {
    sans: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    fontFeatureSettings: '"calt", "liga", "ss01", "cv10"',
  },
  shadows: {
    '--shadow-warhol': '4px 4px 0px rgb(var(--text-primary) / 1)',
    '--shadow-warhol-sm': '2px 2px 0px rgb(var(--text-primary) / 1)',
    '--shadow-glass': '0 4px 30px rgb(var(--black) / 0.1)',
  },
  effects: {
    halftoneOpacity: 0.04,
    duotoneOpacity: 0.85,
  },
};

export const themes: { [key: string]: Theme } = {
  'Warhol 4D-X': warhol4DX,
};

export const activeTheme: Theme = themes['Warhol 4D-X'];
