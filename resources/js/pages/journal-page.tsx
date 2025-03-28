import AppLayout from '@/components/layouts/app-layout';
import React from 'react';

function JournalPage(): JSX.Element {
  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <header className="flex justify-between px-3 items-end mb-1">
          <h1 className="title">
            Журнал
          </h1>
        </header>

      </main>
    </AppLayout>
  );
}

export default JournalPage;
