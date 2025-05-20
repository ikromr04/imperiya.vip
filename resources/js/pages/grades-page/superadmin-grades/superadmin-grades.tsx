import Button from '@/components/ui/button';
import DataTable from '@/components/ui/data-table/data-table';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const/routes';
import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { Grade } from '@/types/grades';
import { ColumnDef } from '@tanstack/react-table';
import React, { lazy, ReactNode, Suspense, useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

const GradesCreateForm = lazy(() => import('@/components/forms/grades/grades-create-form'));

function SuperadminGrades(): ReactNode {
  const [isCreating, setIsCreating] = useState(false);
  const gradesStatus = useAppSelector(getGradesStatus);
  const usersStatus = useAppSelector(getUsersStatus);

  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gradesStatus == AsyncStatus.Idle) dispatch(fetchGradesAction());
    if (usersStatus == AsyncStatus.Idle) dispatch(fetchUsersAction());
  }, [dispatch, gradesStatus, usersStatus]);

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
      id: 'teacher',
      accessorKey: 'teacher',
      header: 'Руководитель',
      size: 320,
      cell: ({ row }) => {
        const teacher = users?.find(({ id }) => id === row.original.teacherId);

        if (!teacher) return;

        return (
          <Link className="block leading-[1.2]" to={generatePath(AppRoute.Users.Show, { id: teacher.id })}>
            {teacher.surname} {teacher.name} {teacher.patronymic}
          </Link>
        );
      },
      sortingFn: (rowA, rowB) => {
        const teacherA = users?.find(({ id }) => id === rowA.original.teacherId)?.surname || '';
        const teacherB = users?.find(({ id }) => id === rowB.original.teacherId)?.surname || '';

        return teacherA.localeCompare(teacherB);
      },
    },
    {
      id: 'students',
      accessorKey: 'students',
      header: 'Ученики',
      size: 240,
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 p-1">
          {users?.filter((user) => user.student?.gradeId === row.original.id).map((user) => (
            <Link
              key={user.id}
              className="py-1 px-2 border rounded bg-gray-100 hover:bg-blue-50 min-w-max"
              to={generatePath(AppRoute.Users.Show, { id: user.id })}
            >
              {user.surname} {user.name}
            </Link>
          ))}
        </div>
      ),
      sortingFn: (rowA, rowB) => {
        const levelA = users?.filter((user) => user.student?.gradeId === rowA.original.id).length || 0;
        const levelB = users?.filter((user) => user.student?.gradeId === rowB.original.id).length || 0;

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
    <>
      <main className="pt-4 pb-40">
        <header className="flex justify-between px-3 items-end mb-1">
          <h1 className="title">
            Классы ({grades?.length})
          </h1>
        </header>

        {grades ? (
          <DataTable
            data={grades}
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

      {isCreating && (
        <Modal isOpen={isCreating}>
          <Suspense fallback={<Spinner className="w-8 h-8" />}>
            <GradesCreateForm grades={grades || []} setIsOpen={setIsCreating} />
          </Suspense>
        </Modal>
      )}
    </>
  );
}

export default SuperadminGrades;
