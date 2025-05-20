import React, { lazy, Suspense, ComponentType } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const SuperadminLessons = lazy(() => import('./superadmin-lessons/superadmin-lessons'));
const TeacherLessons = lazy(() => import('./teacher-lessons/teacher-lessons'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));
const StudentLessons = lazy(() => import('./student-lessons/student-lessons'));

const rolePage: Record<Role, ComponentType> = {
  superadmin: SuperadminLessons,
  admin: NotFoundPage,
  director: NotFoundPage,
  teacher: TeacherLessons,
  parent: NotFoundPage,
  student: StudentLessons,
};

function LessonsPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  const Component = rolePage[authUser.role];

  return (
    <Suspense
      fallback={<Spinner className="w-10 h-10" />}
    >
      <Component />
    </Suspense>
  );
}

export default LessonsPage;
