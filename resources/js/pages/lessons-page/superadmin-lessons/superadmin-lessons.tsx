import React from 'react';
import LessonsTable from '@/components/lessons-table/lessons-table';

function SuperadminLessons(): JSX.Element {
  return (
    <main className="py-2">
      <h1 className="title mb-1 px-3">
        Расписание занятий
      </h1>

      <LessonsTable />
    </main>
  );
}

export default SuperadminLessons;
