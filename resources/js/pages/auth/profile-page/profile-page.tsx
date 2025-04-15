import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import React, { ReactNode } from 'react';
import StudentProfile from './student/student-profile';
import SuperadminProfile from './superadmin/superadmin-profile';
import AppLayout from '@/components/layouts/app-layout';

const Profile = {
  'superadmin': () => <SuperadminProfile />,
  'student': () => <StudentProfile />,
};

function ProfilePage(): ReactNode {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) return <AppLayout />;

  return Profile[authUser?.role as keyof typeof Profile]();
}

export default ProfilePage;
