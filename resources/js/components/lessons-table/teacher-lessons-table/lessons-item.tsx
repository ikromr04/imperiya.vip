import { Hour } from '@/const/lessons';
import dayjs, { Dayjs } from 'dayjs';
import React, { ReactNode } from 'react';
import { Subjects } from '@/types/subjects';
import { Lessons } from '@/types/lessons';
import { Grades } from '@/types/grades';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import classNames from 'classnames';

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
  const authUser = useAppSelector(getAuthUser);
  const teacherLessons = lessons.filter((lesson) => (
    dayjs(lesson.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD') &&
    +lesson.hour === +hour
  ));

  if (!teacherLessons) return;

  const teacherGrades = grades.filter(({ id }) => teacherLessons.some((lesson) => lesson.gradeId === id));

  return (
    <div className="flex justify-evenly text-center leading-none group">
      {teacherLessons.map((lesson) => {
        const grade = teacherGrades.find(({ id }) => id === lesson.gradeId);

        return (
          <div key={lesson.id} className="flex flex-col">
            <div className="flex justify-center text-sm items-baseline">
              <Link
                className={classNames(
                  'duration-150 hover:text-blue-600 truncate text-lg leading-none font-bold',
                  authUser?.role === 'admin' && 'pointer-events-none'
                )}
                to={`${AppRoute.Journal}?gradeId=${lesson.gradeId}&subjectId=${lesson.subjectId}`}
              >
                {grade?.level} {grade?.group}
              </Link>
            </div>
            <span className="truncate text-sm leading-none">
              ({subjects.find(({ id }) => id === lesson.subjectId)?.name})
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default LessonItem;
