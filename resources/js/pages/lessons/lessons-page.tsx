import LessonsCreateForm from '@/components/forms/lessons/lessons-create-form';
import LessonsEditForm from '@/components/forms/lessons/lessons-edit-form';
import PageLayout from '@/components/layouts/app-layout';
import Button from '@/components/ui/button';
import DataTable from '@/components/ui/data-table/data-table';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';
import { getLessons } from '@/store/lessons-slice/lessons-selector';
import { Lesson } from '@/types/lessons';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

function LessonsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const lessons = useAppSelector(getLessons);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dto, setDTO] = useState<Lesson>({
    id: 0,
    name: '',
  });

  useEffect(() => {
    if (!lessons.data && !lessons.isFetching) dispatch(fetchLessonsAction());
  }, [dispatch, lessons.data, lessons.isFetching]);

  const columns: ColumnDef<Lesson>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Урок',
      size: 1734,
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: 'Действия',
      enableSorting: false,
      size: 120,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-1">
          <Button
            icon="edit"
            variant="warn"
            onClick={() => {
              setIsUpdating(true);
              setDTO({
                id: row.original.id,
                name: row.original.name,
              });
            }}
          >
            <span className="sr-only">Редактировать</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <main className="pt-4 pb-40">
        <header className="flex justify-between px-3 items-end mb-1">
          <h1 className="title">
            Уроки ({lessons.data?.length})
          </h1>
        </header>

        {lessons.data ? (
          <DataTable
            data={lessons.data}
            columns={columns}
            sortingState={[{
              id: 'name',
              desc: false,
            }]}
            columnPinningState={{
              right: ['actions']
            }}
            actions={(
              <Button
                icon="add"
                variant="success"
                onClick={() => setIsCreating(true)}
              >
                <span className="sr-only md:not-sr-only">Добавить</span>
              </Button>
            )}
          />
        ) : (
          <Spinner className="w-8 h-8" />
        )}
      </main>

      <Modal isOpen={isCreating}>
        <LessonsCreateForm setIsOpen={setIsCreating} />
      </Modal>
      <Modal isOpen={isUpdating}>
        <LessonsEditForm key={dto.name} lesson={dto} setIsOpen={setIsUpdating} />
      </Modal>
    </PageLayout>
  );
}

export default LessonsPage;
