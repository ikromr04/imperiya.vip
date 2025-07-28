import React, { ComponentType, Suspense, lazy } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const SuperadminBooks = lazy(() => import('./superadmin-books'));
const TeacherBooks = lazy(() => import('./teacher-books'));
const ParentBooks = lazy(() => import('./parent-books'));
const StudentBooks = lazy(() => import('./student-books'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

const rolePage: Record<Role, ComponentType> = {
  superadmin: SuperadminBooks,
  admin: NotFoundPage,
  director: NotFoundPage,
  teacher: TeacherBooks,
  parent: ParentBooks,
  student: StudentBooks,
};

function BooksPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  const Component = rolePage[authUser.role];

  return (
    <Suspense fallback={<Spinner className="w-10 h-10" />}>
      <Component />
    </Suspense>
  );
}

export default BooksPage;
