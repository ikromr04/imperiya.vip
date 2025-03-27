import { Hour } from '@/const/lessons';
import { Grade } from '@/types/grades';
import { Schedules } from '@/types/schedules';
import dayjs, { Dayjs } from 'dayjs';
import React, { Dispatch, SetStateAction } from 'react';
import { SchedulesModal } from './schedules-page';
import { Lessons } from '@/types/lessons';
import { Users } from '@/types/users';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import classNames from 'classnames';
import Button from '@/components/ui/button';

type ScheduleProps = {
  date: Dayjs;
  hour: keyof typeof Hour;
  grade: Grade;
  lessons: Lessons;
  teachers: Users;
  schedules: Schedules;
  setModal: Dispatch<SetStateAction<SchedulesModal>>;
};

function ScheduleItem({
  date,
  hour,
  grade,
  lessons,
  teachers,
  schedules,
  setModal,
}: ScheduleProps): JSX.Element {
  const schedule = schedules.find((schedule) => (
    dayjs(schedule.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD') &&
    schedule.gradeId === grade.id &&
    +schedule.hour === +hour
  ));

  if (!schedule) {
    return (
      <>
        <button
          className={classNames(
            'absolute left-0 top-0 w-full h-full transition-all duration-150 hover:bg-blue-50',
            dayjs().format('YYYY-MM-DD') > dayjs(date).format('YYYY-MM-DD') && 'pointer-events-none'
          )}
          type="button"
          onClick={() => setModal({
            isCreating: true,
            isEditting: false,
            isDeleting: false,
            date: dayjs(date).format(),
            hour,
            grade_id: grade.id,
          })}
        >
          <span className="sr-only">Добавить урок</span>
        </button>
      </>
    );
  }

  return (
    <div className="flex flex-col text-center leading-none group">
      <span className="truncate">
        {lessons.find(({ id }) => id === schedule.lessonId)?.name}
      </span>
      {schedule.teacherId && (
        <Link
          className="text-sm transition-all duration-150 hover:text-blue-600 truncate"
          to={generatePath(AppRoute.Users.Show, { id: schedule.teacherId })}
        >
          ({teachers.find(({ id }) => id === schedule.teacherId)?.name})
        </Link>
      )}
      <div className="absolute right-0 top-0 p-1 flex gap-1 invisible group-hover:visible">
        <Button
          icon="edit"
          variant="warn"
          onClick={() => setModal({
            isCreating: false,
            isEditting: true,
            isDeleting: false,
            schedule,
          })}
        >
          <span className="sr-only">Редактировать</span>
        </Button>
        <Button
          icon="delete"
          variant="error"
          onClick={() => setModal({
            isCreating: false,
            isEditting: false,
            isDeleting: true,
            schedule,
          })}
        >
          <span className="sr-only">Удалить</span>
        </Button>
      </div>
    </div>
  );
}

export default ScheduleItem;
