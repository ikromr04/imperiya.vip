import React from 'react';
import PageLayout from '../layouts/page-layout';

function JournalPage(): JSX.Element {
  return (
    <PageLayout>
      <main className="pt-4 pb-40">
        <header className="flex justify-between px-3 items-end mb-1">
          <h1 className="title">
            Журнал
          </h1>
        </header>

      </main>
    </PageLayout>
  );
}

export default JournalPage;
