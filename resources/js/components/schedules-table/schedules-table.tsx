import React, { Fragment, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Modal from '@/components/ui/modal';
import LessonHour from '@/components/lesson-hour';
import ScheduleCreateForm from '@/components/forms/schedules/schedules-create-form';
import ScheduleEditForm from '@/components/forms/schedules/schedules-edit-form';
import ScheduleDeleteForm from '@/components/forms/schedules/schedules-delete-form';
import { Icons } from '@/components/icons';
import { capitalizeString, getCurrentWeekDates } from '@/utils';
import { Hour } from '@/const/lessons';
import { Grades } from '@/types/grades';
import { Lessons } from '@/types/lessons';
import { Users } from '@/types/users';
import ScheduleItem from './schedule-item';
import {
  ScheduleDeleteDTO,
  ScheduleStoreDTO,
  ScheduleUpdateDTO,
} from '@/dto/schedules';
import { useAppDispatch } from '@/hooks';
import { fetchSchedulesAction } from '@/store/schedules-slice/schedules-api-actions';
import Spinner from '../ui/spinner';
import { Schedules } from '@/types/schedules';

type SchedulesTableProps = {
  grades: Grades;
  lessons: Lessons;
  users: Users;
};

function SchedulesTable({
  grades,
  lessons,
  users
}: SchedulesTableProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [schedules, setSchedules] = useState<Schedules | null>(null);
  const [week, setWeek] = useState(0);
  const weekDates = getCurrentWeekDates(week);
  const [createDTO, setCreateDTO] = useState<ScheduleStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<ScheduleUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<ScheduleDeleteDTO | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!schedules) dispatch(fetchSchedulesAction({
      week,
      onSuccess: (schedules) => setSchedules(schedules),
    }));
  }, [dispatch, schedules, week]);

  const scrollSync = (event: React.UIEvent<HTMLDivElement>) => {
    if (tableRef.current) {
      const { scrollLeft } = event.currentTarget;
      tableRef.current.querySelectorAll('.sync-scroll').forEach((element) => {
        element.scrollLeft = scrollLeft;
      });
    }
  };

  if (!schedules) return <Spinner className="w-8 h-8" />;

  return (
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

            {grades.map((grade) => (
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
                    'min-h-[53px] h-[53px] max-h-[53px] border-b',
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

                  {grades.map((grade) => (
                    <td
                      key={grade.id}
                      className="relative z-0 p-2 border-l min-w-[260px] w-[260px] max-w-[260px]"
                    >
                      <ScheduleItem
                        date={date}
                        hour={Number(hour) as keyof typeof Hour}
                        grade={grade}
                        lessons={lessons}
                        teachers={users.filter((user) => user.role === 'teacher')}
                        schedules={schedules}
                        setCreateDTO={setCreateDTO}
                        setEditDTO={setEditDTO}
                        setDeleteDTO={setDeleteDTO}
                      />
                    </td>
                  ))}
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
            <th className="p-0 border-b min-w-10 w-10"></th>
            <th className="p-0 border-b min-w-[91px]"></th>

            {grades.map((grade) => (
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
            onClick={() => {
              setWeek((prev) => prev - 1);
              setSchedules(null);
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
                setSchedules(null);
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
              setSchedules(null);
            }}
          >
            <span className="sr-only md:not-sr-only">Следующая неделя</span>
            <Icons.next width={7} />
          </button>
        </div>
      </div>

      <Modal isOpen={(createDTO || editDTO || deleteDTO) ? true : false}>
        {createDTO && (
          <ScheduleCreateForm
            dto={createDTO}
            week={week}
            setDTO={setCreateDTO}
            setSchedules={setSchedules}
          />
        )}
        {editDTO && (
          <ScheduleEditForm
            dto={editDTO}
            week={week}
            setDTO={setEditDTO}
            setSchedules={setSchedules}
          />
        )}
        {deleteDTO && (
          <ScheduleDeleteForm
            dto={deleteDTO}
            week={week}
            setDTO={setDeleteDTO}
            setSchedules={setSchedules}
          />
        )}
      </Modal>
    </div>
  );
}

export default SchedulesTable;
