import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  useEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);

  const body = document.body;
  body.setAttribute('data-theme', theme);

  function applyTheme(themeToApply) {
    if (themeToApply === 'system') {
      setTheme(systemTheme);
    } else {
      setTheme(themeToApply);
    }
  }

  const themeValue = {
    theme,
    setTheme,
    applyTheme
  };

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
