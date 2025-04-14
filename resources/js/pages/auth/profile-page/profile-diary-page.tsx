import React from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import StudentDiary from './student/student-diary';

const Diary = {
  'student': () => <StudentDiary />,
};

function ProfileDiaryPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  return Diary[authUser?.role as keyof typeof Diary]();
}

export default ProfileDiaryPage;
