import GradesCreateForm from '@/components/forms/grades/grades-create-form';
import PageLayout from '@/components/layouts/app-layout';
import Button from '@/components/ui/button';
import DataTable from '@/components/ui/data-table/data-table';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { Grade } from '@/types/grades';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

function GradesPage(): JSX.Element {
  const [isCreating, setIsCreating] = useState(false);
  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
  }, [dispatch, grades.data, grades.isFetching, users.data, users.isFetching]);

  const columns: ColumnDef<Grade>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Класс',
      size: 88,
      cell: ({ row }) => (
        <Link
          className="text-lg font-semibold flex items-center w-full justify-center"
          to={generatePath(AppRoute.Classes.Show, { id: row.original.id })}
        >
          {row.original.level} <sup>"</sup>{row.original.group}<sup>"</sup>
        </Link>
      ),
      sortingFn: (rowA, rowB) => {
        const levelA = rowA.original.level;
        const levelB = rowB.original.level;

        if (levelA < levelB) return -1;
        if (levelA > levelB) return 1;

        return 0;
      },
    },
    {
      id: 'students',
      accessorKey: 'students',
      header: 'Ученики',
      size: 240,
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 p-1">
          {users.data?.filter((user) => user.student?.gradeId === row.original.id).map((user) => (
            <Link
              key={user.id}
              className="py-1 px-2 border rounded bg-gray-100 hover:bg-blue-50 min-w-max"
              to={generatePath(AppRoute.Users.Show, { id: user.id })}
            >
              {user.name}
            </Link>
          ))}
        </div>
      ),
      sortingFn: (rowA, rowB) => {
        const levelA = users.data?.filter((user) => user.student?.gradeId === rowA.original.id).length || 0;
        const levelB = users.data?.filter((user) => user.student?.gradeId === rowB.original.id).length || 0;

        if (levelA < levelB) return -1;
        if (levelA > levelB) return 1;

        return 0;
      },
      meta: {
        columnClass: '!min-w-none !w-full !max-w-none',
      }
    },
  ];

  return (
    <PageLayout>
      <main className="pt-4 pb-40">
        <header className="flex justify-between px-3 items-end mb-1">
          <h1 className="title">
            Классы ({grades.data?.length})
          </h1>
        </header>

        {grades.data ? (
          <DataTable
            data={grades.data}
            columns={columns}
            sortingState={[{
              id: 'name',
              desc: false,
            }]}
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
        <GradesCreateForm grades={grades.data || []} setIsOpen={setIsCreating} />
      </Modal>
    </PageLayout>
  );
}

export default GradesPage;
