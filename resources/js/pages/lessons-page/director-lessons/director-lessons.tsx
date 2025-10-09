import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { getUsersStatus } from '@/store/users-slice/users-selector';
import { getSubjectsStatus } from '@/store/subjects-slice/subjects-selector';
import { Lessons } from '@/types/lessons';
import { capitalizeString, getCurrentWeekDates } from '@/utils';
import dayjs from 'dayjs';
import { Icons } from '@/components/icons';
import LessonRow from './lesson-row';
import { AsyncStatus } from '@/const/store';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { fetchSubjectsAction } from '@/store/subjects-slice/subjects-api-actions';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';

function DirectorLessons(): JSX.Element {
  const dispatch = useAppDispatch();
  const gradesStatus = useAppSelector(getGradesStatus);
  const usersStatus = useAppSelector(getUsersStatus);
  const subjectsStatus = useAppSelector(getSubjectsStatus);
  const grades = useAppSelector(getGrades);
  const [week, setWeek] = useState(0);
  const weekDates = useMemo(() => getCurrentWeekDates(week), [week]);
  const tableRef = useRef<HTMLTableElement>(null);
  const today = useMemo(() => dayjs().format('YYYY-MM-DD'), []);
  const [lessons, setLessons] = useState<Lessons>();

  useEffect(() => {
    dispatch(fetchLessonsAction({ week, onSuccess: setLessons }));
  }, [dispatch, week]);

  useEffect(() => {
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (subjectsStatus === AsyncStatus.Idle) dispatch(fetchSubjectsAction());
  }, [dispatch, gradesStatus, subjectsStatus, usersStatus]);

  const scrollSync = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft } = event.currentTarget;
    if (!tableRef.current) return;

    tableRef.current
      .querySelectorAll<HTMLDivElement>('.sync-scroll')
      .forEach((element) => {
        element.scrollLeft = scrollLeft;
      });
  }, []);

  const handleWeekChange = useCallback((change: number) => () => {
    setWeek((prev) => (change === 0) ? 0 : (prev + change));
  }, []);

  return (
    <main className="py-2">
      <h1 className="title mb-1 px-3">
        Расписание занятий
      </h1>

      <div className="rounded-md shadow border pb-1 bg-[linear-gradient(to_bottom,white_0%,white_50%,#f3f4f6_50%,#f3f4f6_100%)]">
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
              <th className="min-w-7 w-7 max-w-7 sticky left-7 z-10 bg-gray-100"></th>
              <th className="min-w-20 w-20 max-w-20"></th>

              {grades?.map((grade) => (
                <th
                  key={grade.id}
                  className="p-2 min-w-[260px] w-[260px] max-w-[260px] text-center"
                >
                  Класс {grade.level} {grade.group}
                </th>
              ))}
            </tr>
          </thead>

          <tbody
            className="overflow-x-auto no-scrollbar sync-scroll bg-white"
            onScroll={scrollSync}
          >
            {weekDates.map((date) => (
              <LessonRow
                key={date.toString()}
                date={date}
                isToday={date.format('YYYY-MM-DD') === today}
                lessons={lessons}
              />
            ))}
          </tbody>

          <tfoot
            className="sticky bottom-[48px] z-10 overflow-x-auto bg-white styled-scrollbar mb-[-1px] sync-scroll"
            onScroll={scrollSync}
          >
            <tr>
              <th className="p-0 border-b min-w-10 w-10"></th>
              <th className="p-0 border-b min-w-[91px]"></th>

              {grades?.map((grade) => (
                <th
                  key={grade.id}
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
              onClick={handleWeekChange(-1)}
            >
              <Icons.previous width={7} />
              <span className="sr-only md:not-sr-only">Предыдущая неделя</span>
            </button>
            {week !== 0 && (
              <button
                className="flex justify-center items-center h-8 rounded-md"
                onClick={handleWeekChange(0)}
              >
                <Icons.currentWeek width={16} height={16} />
                <span className="sr-only">Текущая неделя</span>
              </button>
            )}
            <button
              className="flex justify-center items-center gap-x-2 h-8 border-transparent rounded-md border transform disabled:opacity-50 disabled:pointer-events-none"
              onClick={handleWeekChange(1)}
            >
              <span className="sr-only md:not-sr-only">Следующая неделя</span>
              <Icons.next width={7} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DirectorLessons;
