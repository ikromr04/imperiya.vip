import React from 'react';
import AppLayout from '@/components/layouts/app-layout';
import StudentLessonsTable from '@/components/lessons-table/student-lessons-table';

function StudentLessons(): JSX.Element {
  return (
    <AppLayout>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Расписание занятий
        </h1>

        <StudentLessonsTable />
      </main>
    </AppLayout >
  );
}

export default StudentLessons;
