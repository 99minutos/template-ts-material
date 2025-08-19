import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';

import { VITE_NAMESPACE } from '@/utils/envs';

export interface ClaimContextProps {
  claims: Record<string, unknown> | null;
  isValidFor: (permissions: Array<string> | string) => boolean;
}

export function useClaimProvider(): ClaimContextProps {
  const authHooks = useAuth0();
  const [jwt, setJwt] = useState<string | null>(null);
  const [claims, setClaims] = useState<Record<string, unknown> | null>(null);

  const loadJWT = async () => {
    setTimeout(async () => {
      try {
        const token = await authHooks.getAccessTokenSilently();
        if (token) {
          setJwt(token);
        }
      } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
        setJwt(null);
      }
    }, 300);
  };

  const calculateClaims = () => {
    const jwtParts = jwt?.split('.');
    if (jwtParts && jwtParts.length === 3) {
      const payload = jwtParts[1];
      const decodedPayload = atob(payload);
      try {
        const parsedClaims = JSON.parse(decodedPayload);
        Object.keys(parsedClaims).forEach((key) => {
          if (key.startsWith(VITE_NAMESPACE)) {
            const newKey = key.replace(VITE_NAMESPACE, '');
            parsedClaims[newKey] = parsedClaims[key];
            delete parsedClaims[key];
          } else {
            delete parsedClaims[key];
          }
        });
        setClaims(parsedClaims);
      } catch (error) {
        console.error('Error parsing JWT payload:', error);
        setClaims(null);
      }
    }
  };

  const isValidFor = useCallback(
    (restrictedFor: Array<string> | string) => {
      if (!claims) return false;
      const permissions = claims['permissions'] as Array<string>;
      if (!permissions) return false;
      if (typeof restrictedFor === 'string') {
        return permissions.includes(restrictedFor);
      } else if (Array.isArray(restrictedFor)) {
        return restrictedFor.some((permission) => permissions.includes(permission));
      }
      return false;
    },
    [claims],
  );

  useEffect(() => {
    if (!jwt) loadJWT();
    else {
      calculateClaims();
    }
  }, [jwt]);

  return { claims, isValidFor };
}
