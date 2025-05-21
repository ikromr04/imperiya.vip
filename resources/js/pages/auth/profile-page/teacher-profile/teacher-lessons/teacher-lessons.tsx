import Spinner from '@/components/ui/spinner';
import { useAppSelector } from '@/hooks';
import React from 'react';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import Header from '../header';
import Navigation from '../navigation';
import TeacherLessonsTable from '@/components/lessons-table/teacher-lessons-table/teacher-lessons-table';
function TeacherLessons(): JSX.Element {
  const user = useAppSelector(getAuthUser);

  if (!user) return <Spinner className="w-8 h-8 m-2" />;

  return (
    <main className="pt-4 pb-40">
      <Header />

      <Navigation />

      <TeacherLessonsTable />
    </main>
  );
}

export default TeacherLessons;
