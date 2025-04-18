import React from 'react';
import AppLayout from '@/components/layouts/app-layout';
import TeacherLessonsTable from '@/components/lessons-table/teacher-lessons-table';

function TeacherLessons(): JSX.Element {
  return (
    <AppLayout>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Расписание занятий
        </h1>

        <TeacherLessonsTable />
      </main>
    </AppLayout >
  );
}

export default TeacherLessons;
