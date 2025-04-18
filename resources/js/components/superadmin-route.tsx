import { useAppSelector } from '@/hooks';
import NotFoundPage from '@/pages/not-found-page';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import React from 'react';
import { Outlet } from 'react-router-dom';

function SuperadminRoute(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (authUser?.role !== 'superadmin') return <NotFoundPage />;

  return <Outlet />;
}

export default SuperadminRoute;
