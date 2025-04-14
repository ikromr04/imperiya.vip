import React from 'react';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import StudentLessons from './student/student-lessons';

const Lesson = {
  'student': () => <StudentLessons />,
};

function ProfileLessonsPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);

  return Lesson[authUser?.role as keyof typeof Lesson]();
}

export default ProfileLessonsPage;
