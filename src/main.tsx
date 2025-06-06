// prettier-ignore
import '@/styles/global.css';

import { RouteManager } from '@/router-manager';
import { ThemeProvider } from '@mui/material/styles';
import { setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import theme from '@/styles/theme';

import AuthProvider from './components/providers/auth/auth-provider';

setDefaultOptions({ locale: es });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouteManager />
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={5000} closeOnClick pauseOnHover />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
