import { AppRoute } from '@/const/routes';
import { GradeId } from '@/types/grades';
import { Users } from '@/types/users';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Journal, Lessons } from '@/types/lessons';
import Spinner from '../ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '../ui/data-table/data-table';
import dayjs from 'dayjs';
import { SubjectId } from '@/types/subjects';
import { fetchJournalAction, fetchLessonsTypesAction } from '@/store/lessons-slice/lessons-api-actions';
import { Mark } from '@/types/marks';
import MarkCreate from './mark-create';
import MarkEdit from './mark-edit';
import LessonsJournalEditForm from '../forms/lessons/lessons-journal-edit-form';
import { getLessonsTypes } from '@/store/lessons-slice/lessons-selector';

type JournalTableProps = {
  students: Users;
  subjectId: SubjectId;
  gradeId: GradeId;
};

function JournalTable({
  students,
  subjectId,
  gradeId,
}: JournalTableProps): JSX.Element {
  const dispatch = useAppDispatch();
  const lessonsTypes = useAppSelector(getLessonsTypes);
  const [journal, setJournal] = useState<Journal[] | null>(null);
  const [lessons, setLessons] = useState<Lessons>([]);

  useEffect(() => {
    if (!lessonsTypes.data && !lessonsTypes.isFetching) dispatch(fetchLessonsTypesAction());
    if (!journal) dispatch(fetchJournalAction({
      subjectId,
      gradeId,
      onSuccess: (lessons) => {
        setLessons(lessons);
        setJournal(students.map((student) => {
          const dates = lessons.reduce((acc, item) => {
            const mark = item.marks?.find((mark) => mark.studentId === student.id);
            acc[item.date] = mark || '';

            return acc;
          }, {} as Journal);

          return {
            ...dates,
            id: student.id,
            name: `${student.surname} ${student.name}`,
          };
        }));
      },
    }));
  }, [dispatch, gradeId, journal, lessonsTypes.data, lessonsTypes.isFetching, students, subjectId]);

  if (!journal || !lessonsTypes.data || !lessons) {
    return <Spinner className="w-8 h-8" />;
  }

  const columns: ColumnDef<Journal>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'ФИО',
      size: 240,
      cell: ({ row }) => (
        <Link to={generatePath(AppRoute.Users.Show, { id: row.original.id })}>
          {row.original.name}
        </Link>
      ),
      meta: {
        columnClass: 'truncate',
        thClass: 'items-end h-24',
      }
    },
    ...lessons.reduce((acc, item) => {
      acc.push({
        id: item.date,
        accessorKey: item.date,
        header: item.date,
        size: 40,
        cell: ({ row }) => {
          const mark: Mark = row.original[item.date] as Mark;

          if (!mark) {
            if (dayjs(item.date) > dayjs()) return null;

            return (
              <MarkCreate
                studentName={row.original.name}
                studentId={row.original.id}
                lessonId={item.id}
              />
            );
          }

          return (
            <div className="flex items-center justify-center -m-2 p-2">
              <MarkEdit mark={mark} studentName={row.original.name} />
            </div>
          );
        },
        enableSorting: false,
        meta: {
          columnClass: dayjs(item.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? '!bg-green-50 border-r' : 'border-r',
          thClass: 'items-end font-medium',
          renderHeader: () => (
            <span className="relative flex items-end w-6 h-20">
              <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                {item.date}
              </span>
            </span>
          ),
          renderFilter: (_, setIsOpen) => (
            <LessonsJournalEditForm
              lesson={item}
              types={lessonsTypes.data || []}
              setIsOpen={setIsOpen}
            />
          ),
        }
      });
      return acc;
    }, [] as ColumnDef<Journal>[])
  ];

  return (
    <DataTable
      data={journal}
      columns={columns}
      pageSize={50}
      columnPinningState={{
        left: ['name', dayjs().format('YYYY-MM-DD')],
        right: [],
      }}
      sortingState={[{
        id: 'name',
        desc: false,
      }]}
    />
  );
}

export default JournalTable;
