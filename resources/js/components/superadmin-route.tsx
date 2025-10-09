import React, { Suspense, lazy } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Outlet } from 'react-router-dom';
import Spinner from '@/components/ui/spinner';

const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

function SuperadminRoute(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (authUser?.role !== 'superadmin' && authUser?.role !== 'admin') {
    return (
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full w-full">
            <Spinner className="w-10 h-10" />
          </div>
        }
      >
        <NotFoundPage />
      </Suspense>
    );
  }

  return <Outlet />;
}

export default SuperadminRoute;
