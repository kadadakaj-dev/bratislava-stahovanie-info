import React from 'react';
import { Theme } from '../types';
import { SunIcon, MoonIcon } from '../constants';
import { Translations } from '../App';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  t: Translations;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, t }) => {
  const isDark = theme === Theme.Dark;

  return (
    <button
      onClick={onToggle}
      className="relative inline-flex items-center h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-border bg-surface-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-1"
      role="switch"
      aria-checked={isDark}
      aria-label={t.toggleThemeAria}
    >
      <span className="sr-only">{t.toggleThemeAria}</span>
      
      {/* Icons in the track */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2" aria-hidden="true">
        <SunIcon className="h-5 w-5 text-accent" />
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2" aria-hidden="true">
        <MoonIcon className="h-5 w-5 text-accent" />
      </span>

      {/* Sliding Thumb */}
      <span
        aria-hidden="true"
        className={`${
          isDark ? 'translate-x-6' : 'translate-x-0'
        } pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 inline-block h-6 w-6 transform rounded-full bg-text-primary shadow-lg ring-0 transition-transform duration-300 ease-in-out`}
      />
    </button>
  );
};

export default ThemeToggle;