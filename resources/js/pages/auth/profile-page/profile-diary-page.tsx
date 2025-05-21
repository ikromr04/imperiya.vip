import React, { lazy, ComponentType, Suspense } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const StudentDiary = lazy(() => import('./student-profile/student-diary/student-diary'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

const rolePage: Record<Role, ComponentType> = {
  superadmin: NotFoundPage,
  admin: NotFoundPage,
  director: NotFoundPage,
  teacher: NotFoundPage,
  parent: NotFoundPage,
  student: StudentDiary,
};

function ProfileDiaryPage(): JSX.Element {
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

export default ProfileDiaryPage;
