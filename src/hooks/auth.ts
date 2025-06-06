import { useAuth0 } from '@auth0/auth0-react';

interface IAuth0Generic {
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  name?: string;
  email?: string;
}

export const useAuth0Generic = (): IAuth0Generic => {
  const { isLoading, isAuthenticated, user, logout } = useAuth0();

  return {
    logout: () => logout({ logoutParams: { returnTo: window.location.origin } }),
    isLoading,
    isAuthenticated,
    name: user?.name,
    email: user?.email,
  };
};
