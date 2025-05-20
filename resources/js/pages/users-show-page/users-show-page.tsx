import React, { lazy, Suspense, ComponentType } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const SuperadminUsersShow = lazy(() => import('./superadmin-users-show/superadmin-users-show'));
const StudentUsersShow = lazy(() => import('./student-users-show/student-users-show'));
const ParentUsersShow = lazy(() => import('./parent-users-show/parent-users-show'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

const roleComponentMap: Record<Role, ComponentType> = {
  superadmin: SuperadminUsersShow,
  admin: NotFoundPage,
  director: NotFoundPage,
  teacher: NotFoundPage,
  parent: ParentUsersShow,
  student: StudentUsersShow,
};

function UsersShowPage(): JSX.Element {
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

export default UsersShowPage;
