export interface Theme {
  name: string;
  colors: {
    [key: string]: string;
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

const vibrantViandmo: Theme = {
  name: 'Vibrant Viandmo',
  colors: {
    '--black': '19 21 22',
    '--white': '255 255 255',
    '--sapphire': '0 83 156', // Deep blue
    '--tangerine': '242 135 5', // Energetic orange
    '--sky-blue': '232 243 255', // Light blue background
    '--slate-gray': '82 91 99', // Muted text
    
    '--surface-1': 'var(--white)',
    '--surface-2': 'var(--sky-blue)',
    '--text-primary': 'var(--sapphire)',
    '--text-secondary': 'var(--tangerine)',
    '--text-muted': 'var(--slate-gray)',
    '--primary': 'var(--sapphire)',
    '--accent': 'var(--tangerine)',
    '--on-primary': 'var(--white)',
    '--border': '0 83 156 / 0.15',
    '--ring': 'var(--tangerine)',
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
    halftoneOpacity: 0.03,
    duotoneOpacity: 0.9,
  },
};

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
  'Vibrant Viandmo': vibrantViandmo,
  'Warhol 4D-X': warhol4DX,
};

export const activeTheme: Theme = themes['Vibrant Viandmo'];