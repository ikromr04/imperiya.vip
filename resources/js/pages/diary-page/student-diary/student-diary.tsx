import React from 'react';
import AppLayout from '@/components/layouts/app-layout';
import StudentDiaryTable from '@/components/diary-table/student-diary-table';

function StudentDiary(): JSX.Element {
  return (
    <AppLayout>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Дневник ученика
        </h1>

        <StudentDiaryTable />
      </main>
    </AppLayout >
  );
}

export default StudentDiary;
