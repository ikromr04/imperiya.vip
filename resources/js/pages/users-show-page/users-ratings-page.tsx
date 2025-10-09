import React, { lazy, Suspense, ComponentType } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const SuperadminUsersRatings = lazy(() => import('./superadmin-users-show/superadmin-users-ratings'));
const AdminUsersRatings = lazy(() => import('./admin-users-show/admin-users-ratings'));
const DirectorUsersRatings = lazy(() => import('./director-users-show/director-users-ratings'));
const ParentUsersRatings =  lazy(() => import('./parent-users-show/parent-users-ratings'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

const roleComponentMap: Record<Role, ComponentType> = {
  superadmin: SuperadminUsersRatings,
  admin: AdminUsersRatings,
  director: DirectorUsersRatings,
  teacher: NotFoundPage,
  parent: ParentUsersRatings,
  student: NotFoundPage,
};

function UsersRatingsPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  const Component = roleComponentMap[authUser.role] ?? NotFoundPage;

  return (
    <Suspense fallback={<Spinner className="w-10 h-10" />}>
      <Component />
    </Suspense>
  );
}

export default UsersRatingsPage;
