import React from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import NotFoundPage from '../not-found-page';
import StudentLessons from './student-lessons/student-lessons';
import SuperadminLessons from './superadmin-lessons/superadmin-lessons';
import { Role } from '@/types/users';

const Page = {
  'superadmin': () => <SuperadminLessons />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <NotFoundPage />,
  'parent': () => <NotFoundPage />,
  'student': () => <StudentLessons />,
};

function LessonsPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  return Page[authUser?.role as Role]();
}

export default LessonsPage;
