import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosInstance } from 'axios';
import { useEffect, useRef, useState } from 'react';

import { USER_AGENT, VITE_URL_SERVICE } from '@/utils/envs';

import useExampleRequest, { ExampleRequest } from './rest/useExampleRequest';

export interface HttpProviderContext {
  httpIsReady: boolean;
  examples: ExampleRequest;
}

export function useHttpProvider(): HttpProviderContext {
  const { getAccessTokenSilently } = useAuth0();
  const httpInstance = useRef<AxiosInstance>(axios.create({}));
  const [httpIsReady, setHttpIsReady] = useState(false);

  const examples = useExampleRequest(httpInstance);

  useEffect(() => {
    const instance = axios.create({
      baseURL: VITE_URL_SERVICE,
      headers: {
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    instance.interceptors.request.use(async (config) => {
      try {
        const token = await getAccessTokenSilently({});
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        } else {
          console.warn('Token no encontrado.');
        }
      } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
      }
      return config;
    });

    httpInstance.current = instance;
    setHttpIsReady(true);
  }, [getAccessTokenSilently]);

  return { httpIsReady, examples };
}
