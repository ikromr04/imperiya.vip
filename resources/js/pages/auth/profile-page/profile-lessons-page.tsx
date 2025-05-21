import React, { lazy, Suspense, ComponentType } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const StudentLessons = lazy(() => import('./student-profile/student-lessons'));
const TeacherLessons = lazy(() => import('./teacher-profile/teacher-lessons/teacher-lessons'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

const rolePage: Record<Role, ComponentType> = {
  superadmin: NotFoundPage,
  admin: NotFoundPage,
  director: NotFoundPage,
  teacher: TeacherLessons,
  parent: NotFoundPage,
  student: StudentLessons,
};

function ProfileLessonsPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  const Component = rolePage[authUser.role];

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full w-full">
          <Spinner className="w-10 h-10" />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}

export default ProfileLessonsPage;
