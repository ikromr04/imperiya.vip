import React, { lazy, Suspense, ComponentType } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const SuperadminGradesShow = lazy(() => import('./superadmin-grades-show/superadmin-grades-show'));
const AdminGradesShow = lazy(() => import('./admin-grades-show/admin-grades-show'));
const TeacherGradesShow = lazy(() => import('./teacher-grades-show/teacher-grades-show'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

const roleComponentMap: Record<Role, ComponentType> = {
  superadmin: SuperadminGradesShow,
  admin: AdminGradesShow,
  director: NotFoundPage,
  teacher: TeacherGradesShow,
  parent: NotFoundPage,
  student: NotFoundPage,
};

function GradesShowPage(): JSX.Element {
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

export default GradesShowPage;
