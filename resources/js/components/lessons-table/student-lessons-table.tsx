import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Icons } from '@/components/icons';
import { capitalizeString, getCurrentWeekDates } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Spinner from '../ui/spinner';
import { Lessons } from '@/types/lessons';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';
import classNames from 'classnames';
import { Hour } from '@/const/lessons';
import LessonHour from '../lesson-hour';
import StudentLessonsItem from './student-lessons-item';
import { getSubjects } from '@/store/subjects-slice/subjects-selector';
import { getStudent, getUsers } from '@/store/users-slice/users-selector';
import { fetchSubjectsAction } from '@/store/subjects-slice/subjects-api-actions';
import { fetchStudentAction, fetchUsersAction } from '@/store/users-slice/users-api-actions';

function StudentLessonsTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<Lessons | null>(null);
  const [week, setWeek] = useState(0);
  const weekDates = getCurrentWeekDates(week);
  const tableRef = useRef<HTMLTableElement>(null);
  const subjects = useAppSelector(getSubjects);
  const student = useAppSelector(getStudent);
  const users = useAppSelector(getUsers);

  useEffect(() => {
    if (!subjects.data && !subjects.isFetching) dispatch(fetchSubjectsAction());
    if (!student.data && !student.isFetching) dispatch(fetchStudentAction());
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
    if (!lessons && student.data) dispatch(fetchLessonsAction({
      week,
      gradeId: student.data.grade.id,
      onSuccess: (lessons) => setLessons(lessons),
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

  if (!lessons || !subjects.data || !student.data || !users.data) return <Spinner className="w-8 h-8" />;

  return (
    <div className="rounded-md shadow border pb-1 bg-[linear-gradient(to_bottom,white_0%,white_50%,#f3f4f6_50%,#f3f4f6_100%)] max-w-full">
      <table ref={tableRef} className="flex flex-col w-full">
        <caption className="text-left p-2 pl-4 border-b">
          <div className="flex items-baseline gap-1 text-blue-700">
            <Icons.calendar className="relative top-[1px]" height={16} />
            {capitalizeString(dayjs(weekDates[0]).format('MMMM'))}
            {dayjs(weekDates[0]).format('M') !== dayjs(weekDates[5]).format('M') && ` - ${capitalizeString(dayjs(weekDates[5]).format('MMMM'))}`}
          </div>
        </caption>

        <thead
          className="sticky top-0 z-20 bg-gray-100 shadow overflow-x-auto no-scrollbar sync-scroll"
          onScroll={scrollSync}
        >
          <tr>
            <th className="min-w-7 w-7 max-w-7 sticky left-0 z-10 bg-gray-100"></th>
            <th className="min-w-20 w-20 max-w-20"></th>

            {weekDates.map((date) => (
              <th
                key={dayjs(date).format()}
                className={classNames(
                  'p-2 min-w-[260px] w-[260px] max-w-[260px] text-center',
                  dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') && 'bg-green-50',
                )}
              >
                {capitalizeString(date.format('dddd - DD'))}
              </th>
            ))}
          </tr>
        </thead>

        <tbody
          className="overflow-x-auto no-scrollbar sync-scroll bg-white"
          onScroll={scrollSync}
        >
          {Object.keys(Hour).map((hour) => (
            <tr
              key={hour}
              className="min-h-[53px] h-[53px] max-h-[53px] border-b"
            >
              <td className="min-w-7 w-7 max-w-7 text-center font-semibold sticky left-0 z-10 bg-white">
                <div className="absolute left-0 top-0 w-full h-full border-r border-l flex justify-center items-center">
                  {hour}
                </div>
              </td>
              <td className="min-w-20 w-20 max-w-20 text-sm">
                <LessonHour hour={+hour as keyof typeof Hour} />
              </td>

              {weekDates.map((date) => (
                <td
                  key={dayjs(date).format()}
                  className={classNames(
                    'relative z-0 p-2 border-l min-w-[260px] w-[260px] max-w-[260px]',
                    dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'bg-green-50' : 'bg-white',
                  )}
                >
                  {subjects.data && users.data && (
                    <StudentLessonsItem
                      date={date}
                      hour={Number(hour) as keyof typeof Hour}
                      subjects={subjects.data}
                      users={users.data}
                      lessons={lessons}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot
          className="sticky bottom-[48px] z-10 overflow-x-auto bg-white styled-scrollbar mb-[-1px] sync-scroll"
          onScroll={scrollSync}
        >
          <tr>
            <th className="p-0 border-b min-w-10 w-10"></th>
            <th className="p-0 border-b min-w-[91px]"></th>

            {weekDates.map((date) => (
              <th
                key={dayjs(date).format()}
                className="p-0 min-w-[260px] w-[260px] max-w-[260px] text-center border-b"
              ></th>
            ))}
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

export default StudentLessonsTable;
