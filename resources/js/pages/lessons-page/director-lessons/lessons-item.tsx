import { Hour } from '@/const/lessons';
import { Grade } from '@/types/grades';
import { Dayjs } from 'dayjs';
import React, { memo, ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
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
};

function LessonItem({
  lesson,
  subject,
  teacher,
}: LessonItemProps): ReactNode {
  const lessonsStatus = useAppSelector(getLessonsStatus);

  if (lessonsStatus === AsyncStatus.Loading) {
    return (
      <div className="flex flex-col gap-1 items-center animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/5"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  if (!lesson) return;

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
    </div>
  );
}

export default memo(LessonItem);
