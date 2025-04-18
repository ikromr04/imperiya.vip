import React from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import NotFoundPage from '@/pages/not-found-page';
import { Role } from '@/types/users';
import TeacherJournal from './teacher-profile/teacher-journal';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';

const Page = {
  'superadmin': () => <NotFoundPage />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <TeacherJournal />,
  'parent': () => <NotFoundPage />,
  'student': () => <NotFoundPage />,
};

function ProfileDiaryPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  return Page[authUser.role as Role]();
}

export default ProfileDiaryPage;
