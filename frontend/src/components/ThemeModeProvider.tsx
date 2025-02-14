// src/components/ThemeModeProvider.tsx
import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { getTheme } from '../styles/theme';

interface ThemeModeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: 'light',
  toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

interface Props {
  children: ReactNode;
}

export const ThemeModeProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};
