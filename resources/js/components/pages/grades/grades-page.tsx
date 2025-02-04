import GradesTable from '@/components/blocks/grades-table';
import GradesCreateForm from '@/components/forms/grades/grades-create-form';
import PageLayout from '@/components/layouts/page-layout';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import React, { useEffect, useState } from 'react';

function GradesPage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const grades = useAppSelector(getGrades);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!grades) dispatch(fetchGradesAction());
  }, [dispatch, grades]);

  return (
    <PageLayout>
      <main className="relative flex flex-col h-full transition-all duration-300">
        <header className="top flex flex-col gap-2 mb-2 md:mb-3 md:gap-3 min-w-64">
          <div className="flex items-end justify-between gap-2">
            <h1 className="relative flex mr-auto title overflow-scroll no-scrollbar whitespace-nowrap pr-6">
              Все классы
            </h1>
            <div className="relative z-10 min-w-6 h-full pointer-events-none -ml-7 bg-gradient-to-l from-gray-100 to-transparent"></div>

            <Button
              className="min-w-max"
              type="button"
              icon="add"
              variant="success"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only md:not-sr-only">Добавить класс</span>
            </Button>
          </div>
        </header>

        {grades
          ? <GradesTable className="h-[calc(100%-80px)] md:h-[calc(100%-88px)] min-w-64" grades={grades} />
          : <Spinner className="w-8 h-8" />}

        <Modal isOpen={isOpen} key={isOpen.toString()}>
          {grades && <GradesCreateForm grades={grades} setIsOpen={setIsOpen} />}
        </Modal>
      </main>
    </PageLayout>
  );
}

export default GradesPage;
