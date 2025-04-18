import React from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import NotFoundPage from '../not-found-page';
import StudentLessons from './student-lessons/student-lessons';
import SuperadminLessons from './superadmin-lessons/superadmin-lessons';
import { Role } from '@/types/users';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import TeacherLessons from './teacher-lessons/teacher-lessons';

const Page = {
  'superadmin': () => <SuperadminLessons />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <TeacherLessons />,
  'parent': () => <NotFoundPage />,
  'student': () => <StudentLessons />,
};

function LessonsPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  return Page[authUser.role as Role]();
}

export default LessonsPage;
