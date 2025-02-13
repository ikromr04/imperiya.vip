import React from 'react';
import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAppSelector } from '../hooks/index';
import { getAuthStatus } from '../store/auth-slice/auth-selector';
import { AuthorizationStatus } from '@/const/store';
import { AppRoute } from '@/const/routes';

export default function PrivateRoute({
  children,
}: PropsWithChildren): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus === AuthorizationStatus.Auth
      ? <>{children}</>
      : <Navigate to={AppRoute.Auth.Login} />
  );
}
