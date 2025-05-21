import TeacherLessonsTable from '@/components/lessons-table/teacher-lessons-table/teacher-lessons-table';
import React from 'react';

function TeacherLessons(): JSX.Element {
  return (
    <main className="py-2">
      <h1 className="title mb-1 px-3">
        Расписание занятий
      </h1>

      <TeacherLessonsTable />
    </main>
  );
}

export default TeacherLessons;
