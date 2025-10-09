import React, { lazy, Suspense, ComponentType } from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Role } from '@/types/users';
import Spinner from '@/components/ui/spinner';

const SuperadminJournal = lazy(() => import('./superadmin-journal/superadmin-journal'));
const DirectorJournal = lazy(() => import('./director-journal/director-journal'));
const TeacherJournal = lazy(() => import('./teacher-journal/teacher-journal'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

const rolePage: Record<Role, ComponentType> = {
  superadmin: SuperadminJournal,
  admin: NotFoundPage,
  director: DirectorJournal,
  teacher: TeacherJournal,
  parent: NotFoundPage,
  student: NotFoundPage,
};

function JournalPage(): JSX.Element {
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

export default JournalPage;
