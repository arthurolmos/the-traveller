import '../firebase';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Toast from '../components/toast/Toast';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />

      <Toast />
    </ThemeProvider>
  );
}

export default MyApp;
