import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import React, { ReactNode } from 'react';
import StudentProfile from './student/student-profile';
import SuperadminProfile from './superadmin/superadmin-profile';

const Profile = {
  'superadmin': () => <SuperadminProfile />,
  'student': () => <StudentProfile />,
};

function ProfilePage(): ReactNode {
  const authUser = useAppSelector(getAuthUser);

  return Profile[authUser?.role as keyof typeof Profile]();
}

export default ProfilePage;
