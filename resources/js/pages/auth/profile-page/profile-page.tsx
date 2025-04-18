import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import React, { ReactNode } from 'react';
import StudentProfile from './student-profile/student-profile';
import SuperadminProfile from './superadmin-profile/superadmin-profile';
import NotFoundPage from '@/pages/not-found-page';
import { Role } from '@/types/users';

const Page = {
  'superadmin': () => <SuperadminProfile />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <NotFoundPage />,
  'parent': () => <NotFoundPage />,
  'student': () => <StudentProfile />,
};

function ProfilePage(): ReactNode {
  const authUser = useAppSelector(getAuthUser);

  return Page[authUser?.role as Role]();
}

export default ProfilePage;
