import { Hour } from '@/const/lessons';
import dayjs, { Dayjs } from 'dayjs';
import React, { ReactNode } from 'react';
import { Subjects } from '@/types/subjects';
import { Lessons } from '@/types/lessons';
import { Grades } from '@/types/grades';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';

type LessonItemProps = {
  date: Dayjs;
  hour: keyof typeof Hour;
  subjects: Subjects;
  lessons: Lessons;
  grades: Grades;
};

function LessonItem({
  date,
  hour,
  subjects,
  lessons,
  grades,
}: LessonItemProps): ReactNode {
  const lesson = lessons.find((lesson) => (
    dayjs(lesson.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD') &&
    +lesson.hour === +hour
  ));

  if (!lesson) return;

  const grade = grades.find(({ id }) => id === lesson.gradeId);

  return (
    <div className="flex flex-col text-center leading-none group">
      {grade && (
        <div className="flex justify-center text-sm items-baseline">
          <Link
            className="duration-150 hover:text-blue-600 truncate text-lg leading-none font-bold"
            to={`${AppRoute.Journal}?gradeId=${lesson.gradeId}&subjectId=${lesson.subjectId}`}
          >
            {grade.level} {grade.group}
          </Link>
        </div>
      )}
      <span className="truncate text-sm leading-none">
        ({subjects.find(({ id }) => id === lesson.subjectId)?.name})
      </span>
    </div>
  );
}

export default LessonItem;
