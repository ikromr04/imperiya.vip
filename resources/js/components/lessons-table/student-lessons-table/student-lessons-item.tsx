import { Hour } from '@/const/lessons';
import dayjs, { Dayjs } from 'dayjs';
import React, { ReactNode } from 'react';
import { Subjects } from '@/types/subjects';
import { Lessons } from '@/types/lessons';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { Users } from '@/types/users';

type StudentLessonItemProps = {
  date: Dayjs;
  hour: keyof typeof Hour;
  subjects: Subjects;
  users: Users;
  lessons: Lessons;
};

function StudentLessonItem({
  date,
  hour,
  subjects,
  lessons,
  users,
}: StudentLessonItemProps): ReactNode {
  const lesson = lessons.find((lesson) => (
    dayjs(lesson.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD') &&
    +lesson.hour === +hour
  ));

  if (!lesson) return;

  const teacher = users.find(({ id }) => id === lesson.teacherId);

  return (
    <div className="flex flex-col text-center leading-none group">
      <span className="truncate">
        {subjects.find(({ id }) => id === lesson.subjectId)?.name}
      </span>
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

export default StudentLessonItem;
