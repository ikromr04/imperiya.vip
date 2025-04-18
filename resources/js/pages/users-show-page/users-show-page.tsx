import { useAppSelector } from '@/hooks';
import React from 'react';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import NotFoundPage from '@/pages/not-found-page';
import { Role } from '@/types/users';
import SuperadminUsersShow from './superadmin-users-show/superadmin-users-show';
import StudentUsersShow from './student-users-show/student-users-show';
import ParentUsersShow from './parent-users-show/parent-users-show';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';

const Page = {
  'superadmin': () => <SuperadminUsersShow />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <NotFoundPage />,
  'parent': () => <ParentUsersShow />,
  'student': () => <StudentUsersShow />,
};

function UsersShowPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
      return <Navigate to={AppRoute.Auth.Login} />;
    }

    return Page[authUser.role as Role]();
}

export default UsersShowPage;
