import { Hour } from '@/const/lessons';
import { Lessons } from '@/types/lessons';
import { Marks } from '@/types/marks';
import { Subjects } from '@/types/subjects';
import dayjs from 'dayjs';
import React, { ReactNode } from 'react';
import { Icons } from '../icons';
import { Student } from '@/store/users-slice/users-slice';

type DiaryItemProps = {
  date: string;
  hour: keyof typeof Hour;
  lessons: Lessons;
  subjects: Subjects;
  marks: Marks;
  student: Student;
};

function DiaryItem({
  date,
  hour,
  lessons,
  subjects,
  marks,
  student,
}: DiaryItemProps): ReactNode {
  const lesson = lessons.find((lesson) => (
    dayjs(lesson.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD') &&
    +lesson.hour === +hour
  ));
  const subject = subjects.find((subject) => lesson?.subjectId === subject.id);
  const teacher = student.teachers.find(({ id }) => lesson?.teacherId === id);
  const mark = marks.find((mark) => mark?.lessonId === lesson?.id);

  return (
    <>
      <td className="p-2 min-w-[260px] w-[260px] max-w-[260px] text-start border-l font-semibold">
        {subject?.name}
      </td>
      <td className="p-2 min-w-[120px] w-[120px] max-w-[120px] border-l">
        <span className="flex justify-center">
          {mark?.attendance && (
            <Icons.checked className="w-4 h-4 text-success" />
          )}

          {!mark?.attendance && mark?.attendance !== undefined && (
            <Icons.close className="w-4 h-4 text-danger" />
          )}
        </span>
      </td>
      <td className="p-2 min-w-20 w-20 max-w-20 text-center font-bold border-l">
        {mark?.attendance && mark?.score1}
      </td>
      <td className="p-2 min-w-[360px] w-[360px] max-w-[360px] text-start border-l truncate hover:text-wrap">
        {mark?.comment}
      </td>
      <td className="p-2 min-w-[288px] w-[288px] max-w-[288px] text-start border-l">
        {lesson?.homework}
      </td>
      <td className="p-2 min-w-[288px] w-[288px] max-w-[288px] text-start border-l">
        {lesson?.topic}
      </td>
      <td className="p-2 min-w-[320px] w-[320px] max-w-[320px] text-start">
        {teacher?.surname} {teacher?.name} {teacher?.patronymic}
      </td>
    </>
  );
}

export default DiaryItem;
