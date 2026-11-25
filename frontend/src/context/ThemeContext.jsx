import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('yogaveda_theme') || 'vedic';
  });

  useEffect(() => {
    localStorage.setItem('yogaveda_theme', theme);
    if (theme === 'zen-dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'vedic' ? 'zen-dark' : 'vedic');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'zen-dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
