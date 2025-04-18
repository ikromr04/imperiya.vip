import React from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import StudentDiary from './student-profile/student-diary';
import NotFoundPage from '@/pages/not-found-page';
import { Role } from '@/types/users';

const Page = {
  'superadmin': () => <NotFoundPage />,
  'admin': () => <NotFoundPage />,
  'director': () => <NotFoundPage />,
  'teacher': () => <NotFoundPage />,
  'parent': () => <NotFoundPage />,
  'student': () => <StudentDiary />,
};

function ProfileDiaryPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  return Page[authUser?.role as Role]();
}

export default ProfileDiaryPage;
