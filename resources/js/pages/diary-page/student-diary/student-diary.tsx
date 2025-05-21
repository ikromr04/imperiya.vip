import React from 'react';
import StudentDiaryTable from '@/components/diary-table/student-diary-table';

function StudentDiary(): JSX.Element {
  return (
    <main className="py-2">
      <h1 className="title mb-1 px-3">
        Дневник
      </h1>

      <StudentDiaryTable />
    </main>
  );
}

export default StudentDiary;
