import { Outlet, Route, Routes } from 'react-router-dom';

import Page404 from '@/pages/404';
import WelcomePage from '@/pages/welcome/welcome-page';

import DashboardTopLayout from './components/layouts/dashboard-top/dashboard-top-layout';
import { AppProvider } from './components/providers/app/app-provider';
import ClaimComponent from './components/providers/auth/claim-provider';
import { AuthRequired } from './components/providers/auth/guards';
import { HttpProvider } from './components/providers/http/http-provider';

/**
 * HttpProvider
 * Libre para agregar dominio de peticiones que estaran disponibles a cualquier nivel de la aplicación via useHttp()
 */

/**
 * AppProvider
 * Libre para agregar proveedores que se comparten a cualquier nivel de la aplicación via useApp()
 */

/**
 *
 * La plantilla cuenta con 3 wrappers, DashboardTopLayout, DashboardLayout y SimpleLayout
 */

function WrapperDashboard() {
  return (
    <HttpProvider>
      <ClaimComponent>
        <AppProvider>
          <DashboardTopLayout>
            <Outlet />
          </DashboardTopLayout>
        </AppProvider>
      </ClaimComponent>
    </HttpProvider>
  );
}

export function RouteManager() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequired>
            <WrapperDashboard />
          </AuthRequired>
        }
      >
        <Route path="/" element={<WelcomePage />} />

        {/* <Route path="/coverage/create-version" element={<CoverageAddPage />} /> */}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
