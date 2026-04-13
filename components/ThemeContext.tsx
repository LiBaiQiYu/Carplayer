'use client'
import { createContext, useContext, ReactNode, useEffect, useState, useCallback, useRef } from 'react';

const STORAGE_KEY = 'color-scheme';

interface ThemeContextType {
  isDark: boolean;
  toggle: (event: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDarkRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const dark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    isDarkRef.current = dark;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
    setMounted(true);
  }, []);

  const toggle = useCallback((_event: React.MouseEvent) => {
    if (!document.startViewTransition) {
      isDarkRef.current = !isDarkRef.current;
      document.documentElement.classList.toggle('dark', isDarkRef.current);
      setIsDark(isDarkRef.current);
      localStorage.setItem(STORAGE_KEY, isDarkRef.current ? 'dark' : 'light');
      return;
    }

    document.startViewTransition(() => {
      isDarkRef.current = !isDarkRef.current;
      document.documentElement.classList.toggle('dark', isDarkRef.current);
      setIsDark(isDarkRef.current);
      localStorage.setItem(STORAGE_KEY, isDarkRef.current ? 'dark' : 'light');
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark: mounted ? isDark : false, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
