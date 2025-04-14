import React from 'react';
import AppLayout from '@/components/layouts/app-layout';
import DiaryTable from '@/components/diary-table/diary-table';

function DiaryPage(): JSX.Element {
  return (
    <AppLayout>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Дневник ученика
        </h1>

        <DiaryTable />
      </main>
    </AppLayout >
  );
}

export default DiaryPage;
