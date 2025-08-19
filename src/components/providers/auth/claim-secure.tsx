import { PropsWithChildren, useMemo } from 'react';

import { useClaims } from '@/hooks/auth';

interface VisibleForProps {
  permissions: string | string[];
  children: React.ReactNode;
}
export function VisibleFor(props: PropsWithChildren<VisibleForProps>) {
  const { isValidFor } = useClaims();

  const isValid = useMemo(() => {
    return isValidFor(props.permissions);
  }, [isValidFor, props.permissions]);

  if (!isValid) return <></>;
  return <>{props.children}</>;
}
