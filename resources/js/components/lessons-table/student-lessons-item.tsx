import { Hour } from '@/const/lessons';
import dayjs, { Dayjs } from 'dayjs';
import React, { memo, ReactNode } from 'react';
import { Subjects } from '@/types/subjects';
import { Lessons } from '@/types/lessons';
import { Student } from '@/store/users-slice/users-slice';

type StudentLessonItemProps = {
  date: Dayjs;
  hour: keyof typeof Hour;
  subjects: Subjects;
  student: Student;
  lessons: Lessons;
};

function StudentLessonItem({
  date,
  hour,
  subjects,
  student,
  lessons,
}: StudentLessonItemProps): ReactNode {
  const lesson = lessons.find((lesson) => (
    dayjs(lesson.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD') &&
    +lesson.hour === +hour
  ));

  if (!lesson) return null;

  const teacher = student.teachers.find(({ id }) => id === lesson.teacherId);

  return (
    <div className="flex flex-col text-center leading-none group">
      <span className="truncate">
        {subjects.find(({ id }) => id === lesson.subjectId)?.name}
      </span>
      {teacher && (
        <div className="flex justify-center text-sm items-baseline">
          {teacher.surname} {teacher.name}
        </div>
      )}
    </div>
  );
}

export default memo(StudentLessonItem);
