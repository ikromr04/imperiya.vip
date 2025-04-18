import { useAppSelector } from '@/hooks';
import React from 'react';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import NotFoundPage from '@/pages/not-found-page';
import SuperadminRegisterLinks from './superadmin-register-links/superadmin-register-links';
import { Role } from '@/types/users';

const Page = {
  'superadmin': () => <SuperadminRegisterLinks />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <NotFoundPage />,
  'parent': () => <NotFoundPage />,
  'student': () => <NotFoundPage />,
};

function RegisterLinksPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  return Page[authUser?.role as Role]();
}

export default RegisterLinksPage;
