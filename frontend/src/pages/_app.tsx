import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../components/AuthProvider';
import { ThemeModeProvider } from '../components/ThemeModeProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeModeProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeModeProvider>
    </AuthProvider>
  );
}

export default MyApp;
