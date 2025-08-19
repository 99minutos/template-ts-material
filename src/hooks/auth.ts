import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';

import { ClaimContext } from '@/components/providers/auth/claim-provider';
import { ClaimContextProps } from '@/components/providers/auth/useClaimProvider';

interface IAuth0Generic {
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  name?: string;
  email?: string;
}

export const useAuth0Generic = (): IAuth0Generic => {
  const authHooks = useAuth0();
  return {
    logout: () => authHooks.logout({ logoutParams: { returnTo: window.location.origin } }),
    isLoading: authHooks.isLoading,
    isAuthenticated: authHooks.isAuthenticated,
    name: authHooks.user?.name,
    email: authHooks.user?.email,
  };
};

export function useClaims(): ClaimContextProps {
  return useContext(ClaimContext);
}
