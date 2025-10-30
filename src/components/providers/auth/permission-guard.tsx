import { PropsWithChildren } from 'react';

import { useClaims } from '@/hooks/auth';
import Page404 from '@/pages/404';

interface PermissionGuardProps {
  permissions: string | string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard(props: PropsWithChildren<PermissionGuardProps>) {
  const { isValidFor } = useClaims();

  const hasPermission = isValidFor(props.permissions);

  if (!hasPermission) {
    return <>{props.fallback || <Page404 />}</>;
  }

  return <>{props.children}</>;
}
