import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import React, { ReactNode } from 'react';
import StudentProfile from './student-profile';
import SuperadminProfile from './superadmin-profile';
import AppLayout from '@/components/layouts/app-layout';

function ProfilePage(): ReactNode {
  const authUser = useAppSelector(getAuthUser);

  switch (authUser?.role) {
    case 'superadmin': return <SuperadminProfile user={authUser} />;

    case 'student': return <StudentProfile user={authUser} />;

    default: return <AppLayout />;
  }
}

export default ProfilePage;
