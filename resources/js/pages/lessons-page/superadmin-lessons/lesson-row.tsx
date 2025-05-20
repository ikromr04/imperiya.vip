import LessonHour from '@/components/lesson-hour';
import { Hour } from '@/const/lessons';
import { LessonDeleteDTO, LessonStoreDTO, LessonUpdateDTO } from '@/dto/lessons';
import { useAppSelector } from '@/hooks';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { capitalizeString } from '@/utils';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { Dispatch, memo, ReactNode, SetStateAction, useMemo } from 'react';
import LessonsItem from './lessons-item';
import { Lesson, Lessons } from '@/types/lessons';
import { getSubjects } from '@/store/subjects-slice/subjects-selector';
import { getUsers } from '@/store/users-slice/users-selector';
import { Subject } from '@/types/subjects';
import { User } from '@/types/users';

type LessonRowProps = {
  date: dayjs.Dayjs;
  isToday: boolean;
  lessons?: Lessons;
  setCreateDTO: Dispatch<SetStateAction<LessonStoreDTO | undefined>>
  setEditDTO: Dispatch<SetStateAction<LessonUpdateDTO | undefined>>
  setDeleteDTO: Dispatch<SetStateAction<LessonDeleteDTO | undefined>>
}

function LessonRow({
  date,
  isToday,
  lessons,
  setCreateDTO,
  setEditDTO,
  setDeleteDTO,
}: LessonRowProps): ReactNode {
  const grades = useAppSelector(getGrades);
  const subjects = useAppSelector(getSubjects);
  const users = useAppSelector(getUsers);

  const lessonObject = useMemo(() => {
    const object: Record<string, Lesson> = {};
    lessons?.forEach((lesson) => {
      const key = `${lesson.date}_${lesson.gradeId}_${lesson.hour}`;
      object[key] = lesson;
    });
    return object;
  }, [lessons]);

  const subjectObject = useMemo(() => {
    const object: Record<string, Subject> = {};
    subjects?.forEach((subject) => {
      object[subject.id] = subject;
    });
    return object;
  }, [subjects]);

  const teacherObject = useMemo(() => {
    const object: Record<string, User> = {};
    users?.forEach((user) => {
      if (user.role === 'teacher') {
        object[user.id] = user;
      }
    });
    return object;
  }, [users]);

  return (
    <>
      <tr className={classNames('border-b', isToday && 'bg-green-50')}>
        <td
          className={classNames('min-w-7 w-7 max-w-7 sticky left-0 z-10', isToday ? 'bg-green-50' : 'bg-white')}
          rowSpan={9}
        >
          <div className="absolute left-1/2 top-1/2 flex gap-2 min-w-max text-blue-700 -translate-x-1/2 -translate-y-1/2 -rotate-90">
            {capitalizeString(date.format('dddd - DD'))}
          </div>
        </td>
      </tr>
      {Object.keys(Hour).map((hour) => (
        <tr key={hour} className={classNames('min-h-[53px] h-[53px] max-h-[53px] border-b', isToday && 'bg-green-50')}>
          <td className="min-w-7 w-7 max-w-7 text-center font-semibold sticky left-7 z-10">
            <div
              className={classNames(
                'absolute left-0 top-0 w-full h-full border-r border-l flex justify-center items-center',
                isToday ? 'bg-green-50' : 'bg-white'
              )}
            >
              {hour}
            </div>
          </td>
          <td className="min-w-20 w-20 max-w-20 text-sm">
            <LessonHour hour={+hour as keyof typeof Hour} />
          </td>
          {grades?.map((grade) => {
            const key = `${date.format('YYYY-MM-DD')}_${grade.id}_${hour}`;
            const lesson = lessonObject[key];
            const subject = lesson?.subjectId ? subjectObject[lesson.subjectId] : undefined;
            const teacher = lesson?.teacherId ? teacherObject[lesson.teacherId] : undefined;

            return (
              <td key={grade.id} className="relative z-0 p-2 border-l min-w-[260px]">
                <LessonsItem
                  date={date}
                  hour={+hour as keyof typeof Hour}
                  grade={grade}
                  lesson={lesson}
                  subject={subject}
                  teacher={teacher}
                  setCreateDTO={setCreateDTO}
                  setEditDTO={setEditDTO}
                  setDeleteDTO={setDeleteDTO}
                />
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export default memo(LessonRow);
