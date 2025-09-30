import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, SparklesIcon } from '../constants';
import { themeService, UserThemePreference } from '../services/themeService';
import { Translations } from '../App';

interface ThemeToggleProps {
  initialPref?: UserThemePreference;
  t: Translations;
}

const order: UserThemePreference[] = ['light', 'dark', 'auto'];

const ThemeToggle: React.FC<ThemeToggleProps> = ({ initialPref = 'light', t }) => {
  const [pref, setPref] = useState<UserThemePreference>(initialPref);

  useEffect(() => {
    // initialize from storage if exists
    const stored = (typeof window !== 'undefined' && localStorage.getItem('ui-theme-pref')) as UserThemePreference | null;
    if (stored) {
      setPref(stored);
      themeService.setUserTheme(stored);
    } else {
      themeService.setUserTheme(pref);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cycle = () => {
    const idx = order.indexOf(pref);
    const next = order[(idx + 1) % order.length];
    setPref(next);
    themeService.setUserTheme(next);
  };

  const labelMap: Record<UserThemePreference, string> = {
    light: t.themeLight || 'Svetlý režim',
    dark: t.themeDark || 'Tmavý režim',
    auto: t.themeAuto || 'Automaticky (systém)',
  };

  const icon = pref === 'auto' ? <SparklesIcon className="h-5 w-5 text-accent" /> : pref === 'dark' ? <MoonIcon className="h-5 w-5 text-accent" /> : <SunIcon className="h-5 w-5 text-accent" />;

  return (
    <button
      onClick={cycle}
      className="inline-flex items-center gap-2 px-3 h-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-border bg-surface-2 text-xs font-medium tracking-wide uppercase transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-1"
      aria-label={t.toggleThemeAria}
      aria-live="polite"
      title={labelMap[pref]}
    >
      <span className="sr-only">{t.toggleThemeAria}</span>
      {icon}
      <span>{pref}</span>
    </button>
  );
};

export default ThemeToggle;