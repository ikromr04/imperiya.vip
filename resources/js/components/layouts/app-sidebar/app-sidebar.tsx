import { useAppSelector } from '@/hooks';
import React from 'react';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import NotFoundPage from '@/pages/not-found-page';
import { Role } from '@/types/users';
import SuperadminSidebar from './superadmin-sidebar';
import StudentSidebar from './student-sidebar';
import ParentSidebar from './parent-sidebar';
import TeacherSidebar from './teacher-sidebar';

const Sidebar = {
  'superadmin': () => <SuperadminSidebar />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <TeacherSidebar />,
  'parent': () => <ParentSidebar />,
  'student': () => <StudentSidebar />,
};

function AppSidebar(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  return Sidebar[authUser?.role as Role]();
}

export default AppSidebar;
