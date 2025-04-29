import React, { Fragment, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import LessonHour from '@/components/lesson-hour';
import { Icons } from '@/components/icons';
import { capitalizeString, getCurrentWeekDates } from '@/utils';
import { Hour } from '@/const/lessons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Lessons } from '@/types/lessons';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';
import { getSubjects } from '@/store/subjects-slice/subjects-selector';
import { getStudent, getUsers } from '@/store/users-slice/users-selector';
import { fetchSubjectsAction } from '@/store/subjects-slice/subjects-api-actions';
import Spinner from '../ui/spinner';
import { fetchStudentAction, fetchUsersAction } from '@/store/users-slice/users-api-actions';
import DiaryItem from './diary-item';
import { Marks } from '@/types/marks';
import { fetchMarksAction } from '@/store/marks-slice/marks-api-actions';

function StudentDiaryTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const student = {};
  const subjects = useAppSelector(getSubjects);
  const users = useAppSelector(getUsers);
  const [lessons, setLessons] = useState<Lessons | null>(null);
  const [marks, setMarks] = useState<Marks | null>(null);
  const [week, setWeek] = useState(0);
  const weekDates = getCurrentWeekDates(week);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!subjects.data && !subjects.isFetching) dispatch(fetchSubjectsAction());
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
    if (!lessons && student.data) dispatch(fetchLessonsAction({
      week,
      gradeId: student.data.grade.id,
      onSuccess: (lessons) => setLessons(lessons),
    }));
    if (lessons) dispatch(fetchMarksAction({
      lessons: lessons.map(({ id }) => id),
      onSuccess: (marks) => setMarks(marks),
    }));
  }, [dispatch, lessons, student.data, student.isFetching, subjects.data, subjects.isFetching, users.data, users.isFetching, week]);

  const scrollSync = (event: React.UIEvent<HTMLDivElement>) => {
    if (tableRef.current) {
      const { scrollLeft } = event.currentTarget;
      tableRef.current.querySelectorAll('.sync-scroll').forEach((element) => {
        element.scrollLeft = scrollLeft;
      });
    }
  };

  if (!lessons || !users.data || !student.data) return <Spinner className="w-8 h-8" />;

  return (
    <div className="rounded-md shadow border pb-1 bg-[linear-gradient(to_bottom,white_0%,white_50%,#f3f4f6_50%,#f3f4f6_100%)]">
      <table ref={tableRef} className="flex flex-col w-full">
        <caption className="text-left p-2 pl-4 border-b">
          <div className="flex items-baseline gap-1 text-blue-700">
            <Icons.calendar className="relative top-[1px]" height={16} />
            {capitalizeString(dayjs(weekDates[0]).format('MMMM - YYYY'))}
            {dayjs(weekDates[0]).format('M') !== dayjs(weekDates[5]).format('M') && ` - ${capitalizeString(dayjs(weekDates[5]).format('MMMM'))}`}
          </div>
        </caption>

        <thead
          className="sticky top-0 z-20 bg-gray-100 shadow overflow-x-auto no-scrollbar sync-scroll"
          onScroll={scrollSync}
        >
          <tr>
            <th className="min-w-7 w-7 max-w-7 sticky left-0 z-10 bg-gray-100"></th>
            <th className="min-w-7 w-7 max-w-7 sticky left-7 z-10 bg-gray-100"></th>
            <th className="min-w-20 w-20 max-w-20"></th>

            <th className="p-2 min-w-[260px] w-[260px] max-w-[260px] text-start">
              Предмет
            </th>
            <th className="p-2 min-w-[120px] w-[120px] max-w-[120px] text-start">
              Посещаемость
            </th>
            <th className="p-2 min-w-20 w-20 max-w-20 text-center font-bold">
              Оценка
            </th>
            <th className="p-2 min-w-[360px] w-[360px] max-w-[360px] text-start">
              Комментарий
            </th>
            <th className="p-2 min-w-[288px] w-[288px] max-w-[288px] text-start">
              Домашнее задание
            </th>
            <th className="p-2 min-w-[288px] w-[288px] max-w-[288px] text-start">
              Тема урока
            </th>
            <th className="p-2 min-w-[320px] w-[320px] max-w-[320px] text-start">
              Педагог
            </th>
          </tr>
        </thead>

        <tbody
          className="overflow-x-auto no-scrollbar sync-scroll bg-white"
          onScroll={scrollSync}
        >
          {weekDates.map((date) => (
            <Fragment key={date.format('YYYY-MM-DD')}>
              <tr
                className={classNames(
                  'border-b',
                  dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') && 'bg-green-50',
                )}
              >
                <td
                  className={classNames(
                    'min-w-7 w-7 max-w-7 sticky left-0 z-10',
                    dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'bg-green-50' : 'bg-white',
                  )}
                  rowSpan={9}
                >
                  <div className="absolute left-1/2 top-1/2 flex gap-2 min-w-max text-blue-700 -translate-x-1/2 -translate-y-1/2 -rotate-90">
                    {capitalizeString(date.format('dddd - DD'))}
                  </div>
                </td>
              </tr>

              {Object.keys(Hour).map((hour) => (
                <tr
                  key={hour}
                  className={classNames(
                    'min-h-10 h-10 border-b',
                    dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') && 'bg-green-50'
                  )}
                >
                  <td className="min-w-7 w-7 max-w-7 text-center font-semibold sticky left-7 z-10">
                    <div
                      className={classNames(
                        'absolute left-0 top-0 w-full h-full border-r border-l flex justify-center items-center',
                        dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'bg-green-50' : 'bg-white',
                      )}
                    >
                      {hour}
                    </div>
                  </td>
                  <td className="min-w-20 w-20 max-w-20 text-sm">
                    <LessonHour hour={+hour as keyof typeof Hour} />
                  </td>

                  {subjects.data && users.data && marks && (
                    <DiaryItem
                      date={dayjs(date).format()}
                      hour={+hour as keyof typeof Hour}
                      lessons={lessons}
                      subjects={subjects.data}
                      marks={marks}
                      users={users.data}
                    />
                  )}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>

        <tfoot
          className="sticky bottom-[48px] z-10 overflow-x-auto bg-white styled-scrollbar mb-[-1px] sync-scroll"
          onScroll={scrollSync}
        >
          <tr>
            <td className="p-0 min-w-7 w-7 max-w-7 sticky left-0 z-10 bg-gray-100"></td>
            <td className="p-0 min-w-7 w-7 max-w-7 sticky left-7 z-10 bg-gray-100"></td>
            <td className="p-0 min-w-20 w-20 max-w-20"></td>
            <td className="p-0 border-t min-w-[260px] w-[260px] max-w-[260px] text-start"></td>
            <td className="p-0 border-t min-w-[120px] w-[120px] max-w-[120px] text-start"></td>
            <td className="p-0 border-t min-w-20 w-20 max-w-20 text-center font-bold"></td>
            <td className="p-0 border-t min-w-[360px] w-[360px] max-w-[360px] text-start"></td>
            <td className="p-0 border-t min-w-[288px] w-[288px] max-w-[288px] text-start"></td>
            <td className="p-0 border-t min-w-[288px] w-[288px] max-w-[288px] text-start"></td>
            <td className="p-0 border-t min-w-[320px] w-[320px] max-w-[320px] text-start"></td>
          </tr>
        </tfoot>
      </table>

      <div className="sticky bottom-0 z-10 p-2 border-t bg-gray-100">
        <div className="flex w-max ml-auto gap-4">
          <button
            className="flex justify-center items-center gap-x-2 h-8 border-transparent rounded-md border transform disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => {
              setWeek((prev) => prev - 1);
              setLessons(null);
            }}
          >
            <Icons.previous width={7} />
            <span className="sr-only md:not-sr-only">Предыдущая неделя</span>
          </button>
          {week !== 0 && (
            <button
              className="flex justify-center items-center h-8 rounded-md"
              onClick={() => {
                setWeek(0);
                setLessons(null);
              }}
            >
              <Icons.currentWeek width={16} height={16} />
              <span className="sr-only">Текущая неделя</span>
            </button>
          )}
          <button
            className="flex justify-center items-center gap-x-2 h-8 border-transparent rounded-md border transform disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => {
              setWeek((prev) => prev + 1);
              setLessons(null);
            }}
          >
            <span className="sr-only md:not-sr-only">Следующая неделя</span>
            <Icons.next width={7} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDiaryTable;
