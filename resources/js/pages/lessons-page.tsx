import React from 'react';
import { useAppSelector } from '@/hooks';
import AppLayout from '@/components/layouts/app-layout';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import LessonsTable from '@/components/lessons-table/lessons-table';
import StudentLessonsTable from '@/components/lessons-table/student-lessons-table';

const table = {
  'superadmin': () => <LessonsTable />,
  'student': () => <StudentLessonsTable />,
};

function LessonsPage(): JSX.Element {
  const authUser = useAppSelector(getAuthUser);
  const Table = table[authUser?.role as keyof typeof table];

  return (
    <AppLayout>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Расписание занятий
        </h1>

        <Table />
      </main>
    </AppLayout >
  );
}

export default LessonsPage;
