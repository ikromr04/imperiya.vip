import { Hour } from '@/const/lessons';
import { Grade } from '@/types/grades';
import dayjs, { Dayjs } from 'dayjs';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import classNames from 'classnames';
import Button from '@/components/ui/button';
import { LessonDeleteDTO, LessonStoreDTO, LessonUpdateDTO } from '@/dto/lessons';
import { useAppSelector } from '@/hooks';
import { Lesson } from '@/types/lessons';
import { getLessonsStatus } from '@/store/lessons-slice/lessons-selector';
import { AsyncStatus } from '@/const/store';
import { Subject } from '@/types/subjects';
import { User } from '@/types/users';

type LessonItemProps = {
  date: Dayjs;
  hour: keyof typeof Hour;
  grade: Grade;
  lesson?: Lesson;
  subject?: Subject;
  teacher?: User;
  setCreateDTO: Dispatch<SetStateAction<LessonStoreDTO | undefined>>;
  setEditDTO: Dispatch<SetStateAction<LessonUpdateDTO | undefined>>;
  setDeleteDTO: Dispatch<SetStateAction<LessonDeleteDTO | undefined>>;
};

function LessonItem({
  date,
  hour,
  grade,
  lesson,
  subject,
  teacher,
  setCreateDTO,
  setEditDTO,
  setDeleteDTO,
}: LessonItemProps): JSX.Element {
  const lessonsStatus = useAppSelector(getLessonsStatus);

  if (lessonsStatus === AsyncStatus.Loading) {
    return (
      <div className="flex flex-col gap-1 items-center animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/5"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col text-center leading-none group">
      {subject && (
        <Link
          className="duration-150 hover:text-blue-600 truncate"
          to={`${AppRoute.Journal}?gradeId=${lesson.gradeId}&subjectId=${lesson.subjectId}`}
        >
          {subject.name}
        </Link>
      )}
      {teacher && (
        <div className="flex justify-center text-sm items-baseline">
          (<Link
            className="duration-150 hover:text-blue-600 truncate"
            to={generatePath(AppRoute.Users.Show, { id: lesson.teacherId })}
          >
            {teacher.surname} {teacher.name}
          </Link>)
        </div>
      )}

      {dayjs().format('YYYY-MM-DD') <= dayjs(date).format('YYYY-MM-DD') && (
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
