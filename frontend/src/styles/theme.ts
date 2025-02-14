import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#0A84FF', // Azul iOS suave
            },
            secondary: {
              main: '#FF9500', // Laranja suave
            },
            background: {
              default: '#FFFFFF',    // Neutral100
              paper: '#F2F2F7',      // Neutral200
            },
            text: {
              primary: '#000000',
            },
            neutral: {
              100: '#FFFFFF',        // Neutral100
              200: '#F2F2F7',        // Neutral200
              300: '#E5E5EA',        // Neutral300
              400: '#C7C7CC',        // Neutral400
            },
          }
        : {
            primary: {
              main: '#0A84FF',
            },
            secondary: {
              main: '#FF9500',
            },
            background: {
              default: '#1C1C1E',   // DarkNeutral100 (suave, não é um preto absoluto)
              paper: '#2C2C2E',     // DarkNeutral200
            },
            text: {
              primary: '#FFFFFF',
            },
            neutral: {
              100: '#1C1C1E',       // DarkNeutral100
              200: '#2C2C2E',       // DarkNeutral200
              300: '#3A3A3C',       // DarkNeutral300
              400: '#48484A',       // DarkNeutral400
            },
          }),
    },
    typography: {
      fontFamily: '"San Francisco", "Helvetica Neue", sans-serif',
    },
  });
};
