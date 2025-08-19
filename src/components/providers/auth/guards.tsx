import { useAuth0 } from '@auth0/auth0-react';
import { PropsWithChildren, useEffect } from 'react';

import { LoadingPage } from './loading';
import { Auth0WithoutPermission } from './restricted';

// redirect to login page if not authenticated
export const AuthRequired = (props: PropsWithChildren) => {
  const authHooks = useAuth0();

  useEffect(() => {
    if (!authHooks.isAuthenticated && !authHooks.isLoading && !authHooks.error) {
      authHooks.loginWithRedirect({
        appState: {
          returnTo: window.location.pathname,
        },
      });
    }
  }, [
    authHooks.isAuthenticated,
    authHooks.error,
    authHooks.isLoading,
    authHooks.loginWithRedirect,
  ]);

  if (
    authHooks.isLoading ||
    (!authHooks.isAuthenticated && !authHooks.isLoading && !authHooks.error)
  ) {
    return <LoadingPage />;
  }

  if (authHooks.error) {
    return <Auth0WithoutPermission />;
  }

  return props.children;
};
