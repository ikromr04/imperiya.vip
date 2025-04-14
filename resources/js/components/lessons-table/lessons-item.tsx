import { Hour } from '@/const/lessons';
import { Grade } from '@/types/grades';
import dayjs, { Dayjs } from 'dayjs';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { Subjects } from '@/types/subjects';
import { Users } from '@/types/users';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import classNames from 'classnames';
import Button from '@/components/ui/button';
import { LessonDeleteDTO, LessonStoreDTO, LessonUpdateDTO } from '@/dto/lessons';
import { Lessons } from '@/types/lessons';

type LessonItemProps = {
  date: Dayjs;
  hour: keyof typeof Hour;
  grade: Grade;
  subjects: Subjects;
  teachers: Users;
  lessons: Lessons;
  setCreateDTO: Dispatch<SetStateAction<LessonStoreDTO | null>>;
  setEditDTO: Dispatch<SetStateAction<LessonUpdateDTO | null>>;
  setDeleteDTO: Dispatch<SetStateAction<LessonDeleteDTO | null>>;
};

function LessonItem({
  date,
  hour,
  grade,
  subjects,
  teachers,
  lessons,
  setCreateDTO,
  setEditDTO,
  setDeleteDTO,
}: LessonItemProps): JSX.Element {
  const lesson = lessons.find((lesson) => (
    dayjs(lesson.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD') &&
    lesson.gradeId === grade.id &&
    +lesson.hour === +hour
  ));

  if (!lesson) {
    return (
      <>
        <button
          className={classNames(
            'absolute left-0 top-0 w-full h-full transition-all duration-150 hover:bg-blue-50',
            dayjs().format('YYYY-MM-DD') > dayjs(date).format('YYYY-MM-DD') && 'pointer-events-none'
          )}
          type="button"
          onClick={() => setCreateDTO({
            date: dayjs(date).format('YYYY-MM-DD'),
            hour,
            grade_id: grade.id,
            subject_id: 0,
          })}
        >
          <span className="sr-only">Добавить урок</span>
        </button>
      </>
    );
  }

  const teacher = teachers.find(({ id }) => id === lesson.teacherId);

  return (
    <div className="flex flex-col text-center leading-none group">
      <span className="truncate">
        {subjects.find(({ id }) => id === lesson.subjectId)?.name}
      </span>
      {teacher && (
        <div className="flex justify-center text-sm items-baseline">
          (<Link
            className="transition-all duration-150 hover:text-blue-600 truncate"
            to={generatePath(AppRoute.Users.Show, { id: lesson.teacherId })}
          >
            {teacher.surname} {teacher.name}
          </Link>)
        </div>
      )}

      {dayjs().format('YYYY-MM-DD') < dayjs(date).format('YYYY-MM-DD') && (
        <div className="absolute right-0 top-0 p-1 flex gap-1 invisible group-hover:visible">
          <Button
            icon="edit"
            variant="warning"
            onClick={() => setEditDTO({
              id: lesson.id,
              subject_id: lesson.subjectId,
              teacher_id: lesson.teacherId,
            })}
          >
            <span className="sr-only">Редактировать</span>
          </Button>
          <Button
            icon="delete"
            variant="danger"
            onClick={() => setDeleteDTO({
              id: lesson.id,
            })}
          >
            <span className="sr-only">Удалить</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default memo(LessonItem);
