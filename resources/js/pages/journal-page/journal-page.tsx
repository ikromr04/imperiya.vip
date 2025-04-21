import { useAppSelector } from '@/hooks';
import React from 'react';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import NotFoundPage from '@/pages/not-found-page';
import { Role } from '@/types/users';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import TeacherJournal from './teacher-journal/teacher-journal';
import SuperadminJournal from './superadmin-journal/superadmin-journal';

const Page = {
  'superadmin': () => <SuperadminJournal />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <TeacherJournal />,
  'parent': () => <NotFoundPage />,
  'student': () => <NotFoundPage />,
};

function JournalPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  return Page[authUser.role as Role]();
}

export default JournalPage;
