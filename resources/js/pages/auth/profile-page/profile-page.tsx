import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import React, { ReactNode } from 'react';
import SuperadminProfile from './superadmin-profile/superadmin-profile';
import NotFoundPage from '@/pages/not-found-page';
import { Role } from '@/types/users';
import ParentProfile from './parent-profile/parent-profile';
import TeacherProfile from './teacher-profile/teacher-profile';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';

const Page = {
  'superadmin': () => <SuperadminProfile />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <TeacherProfile />,
  'parent': () => <ParentProfile />,
  'student': () => <NotFoundPage />,
};

function ProfilePage(): ReactNode {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  return Page[authUser.role as Role]();
}

export default ProfilePage;
