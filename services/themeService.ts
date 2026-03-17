export type UserThemePreference = 'light' | 'dark' | 'auto';

export const themeService = {
  setUserTheme: (pref: UserThemePreference): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ui-theme-pref', pref);
      // Apply theme logic here
    }
  },
};
