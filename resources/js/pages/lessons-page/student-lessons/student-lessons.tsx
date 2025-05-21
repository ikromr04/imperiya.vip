import StudentLessonsTable from '@/components/lessons-table/student-lessons-table/student-lessons-table';
import React from 'react';

function StudentLessons(): JSX.Element {
  return (
    <main className="py-2">
      <h1 className="title mb-1 px-3">
        Расписание занятий
      </h1>

      <StudentLessonsTable />
    </main>
  );
}

export default StudentLessons;
