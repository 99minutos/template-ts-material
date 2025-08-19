import { createContext, PropsWithChildren } from 'react';

import { ClaimContextProps, useClaimProvider } from './useClaimProvider';

export const ClaimContext = createContext({} as ClaimContextProps);

export default function ClaimComponent(props: PropsWithChildren) {
  const values = useClaimProvider();
  return <ClaimContext.Provider value={values}>{props.children}</ClaimContext.Provider>;
}
