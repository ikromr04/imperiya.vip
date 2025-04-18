import { useAppSelector } from '@/hooks';
import React from 'react';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import NotFoundPage from '@/pages/not-found-page';
import { Role } from '@/types/users';
import SuperadminUsers from './superadmin-users/superadmin-users';

const Page = {
  'superadmin': () => <SuperadminUsers />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <NotFoundPage />,
  'parent': () => <NotFoundPage />,
  'student': () => <NotFoundPage />,
};

function UsersPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  return Page[authUser?.role as Role]();
}

export default UsersPage;
