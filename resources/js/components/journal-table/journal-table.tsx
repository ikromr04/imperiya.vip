import { AppRoute } from '@/const/routes';
import { GradeId } from '@/types/grades';
import { LessonId } from '@/types/lessons';
import { Users } from '@/types/users';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Evaluation, Journal, Schedules } from '@/types/schedules';
import Spinner from '../ui/spinner';
import { useAppDispatch } from '@/hooks';
import { fetchJournalAction } from '@/store/schedules-slice/schedules-api-actions';
import DataTable from '../ui/data-table/data-table';
import dayjs from 'dayjs';
import classNames from 'classnames';
import EvaluationCreate from './evaluation-create';
import EvaluationEdit from './evaluation-edit';
import ScheduleEditTopicForm from '../forms/schedules/schedules-edit-topic-form';

type JournalTableProps = {
  students: Users;
  lessonId: LessonId;
  gradeId: GradeId;
};

function JournalTable({
  students,
  lessonId,
  gradeId,
}: JournalTableProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [journal, setJournal] = useState<Journal[] | null>(null);
  const [schedules, setSchedules] = useState<Schedules>([]);

  useEffect(() => {
    if (!journal) dispatch(fetchJournalAction({
      lessonId,
      gradeId,
      onSuccess: (schedules) => {
        setSchedules(schedules);
        setJournal(students.map((user) => {
          const dates = schedules.reduce((acc, item) => {
            const evaluation = item.evaluations?.find((evaluation) => evaluation.user_id === user.id);
            acc[item.date] = evaluation || '';

            return acc;
          }, {} as Journal);

          return {
            ...dates,
            id: user.id,
            name: user.name,
          };
        }));
      },
    }));
  }, [dispatch, gradeId, journal, lessonId, students]);

  if (!journal) {
    return <Spinner className="w-8 h-8" />;
  }

  const columns: ColumnDef<Journal>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'ФИО',
      size: 320,
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
    ...schedules.reduce((acc, item) => {
      acc.push({
        id: item.date,
        accessorKey: item.date,
        header: item.date,
        size: 40,
        cell: ({ row }) => {
          const evaluation: Evaluation = row.original[item.date] as Evaluation;

          if (!evaluation) {
            if (dayjs(item.date) > dayjs()) {
              return null;
            }
            return (
              <EvaluationCreate
                userId={row.original.id}
                scheduleId={item.id}
              />
            );
          }

          return (
            <div className={classNames(
              'flex items-center justify-center -m-2 p-2',
            )}>
              <EvaluationEdit evaluation={evaluation} />
            </div>
          );
        },
        enableSorting: false,
        meta: {
          columnClass: dayjs(item.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? '!bg-green-50 border-r' : 'border-r',
          thClass: 'items-end font-medium',
          renderHeader: () => (
            <span className="relative flex items-end w-6 h-20">
              <span className="absolute left-1/2 top-[84%] -rotate-90 origin-left">
                {item.date}
              </span>
            </span>
          ),
          renderFilter: () => (
            <ScheduleEditTopicForm schedule={item} />
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
