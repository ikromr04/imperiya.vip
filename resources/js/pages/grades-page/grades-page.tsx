import React, { lazy, Suspense, ComponentType } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const SuperadminGrades = lazy(() => import('./superadmin-grades/superadmin-grades'));
const AdminGrades = lazy(() => import('./admin-grades/admin-grades'));
const DirectorGrades = lazy(() => import('./director-grades/director-grades'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

const roleComponentMap: Record<Role, ComponentType> = {
  superadmin: SuperadminGrades,
  admin: AdminGrades,
  director: DirectorGrades,
  teacher: NotFoundPage,
  parent: NotFoundPage,
  student: NotFoundPage,
};

function GradesPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  const Component = roleComponentMap[authUser.role];

  return (
    <Suspense fallback={<Spinner className="w-10 h-10" />}>
      <Component />
    </Suspense>
  );
}

export default GradesPage;
