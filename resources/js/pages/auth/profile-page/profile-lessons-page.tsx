import React from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import StudentLessons from './student-profile/student-lessons';
import NotFoundPage from '@/pages/not-found-page';
import { Role } from '@/types/users';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import TeacherLessons from './teacher-profile/teacher-lessons';

const Page = {
  'superadmin': () => <NotFoundPage />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <TeacherLessons />,
  'parent': () => <NotFoundPage />,
  'student': () => <StudentLessons />,
};

function ProfileLessonsPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to={AppRoute.Auth.Login} />;
  }

  return Page[authUser.role as Role]();
}

export default ProfileLessonsPage;
