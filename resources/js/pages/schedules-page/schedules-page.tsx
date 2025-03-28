import React, { BaseSyntheticEvent, Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

import PageLayout from '@/components/layouts/app-layout';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import LessonHour from '@/components/lesson-hour';
import ScheduleItem from './schedule-item';

import ScheduleCreateForm from '@/components/forms/schedules/schedules-create-form';
import ScheduleEditForm from '@/components/forms/schedules/schedules-edit-form';
import ScheduleDeleteForm from '@/components/forms/schedules/schedules-delete-form';

import { Icons } from '@/components/icons';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchSchedulesAction } from '@/store/schedules-slice/schedules-api-actions';
import { getSchedules } from '@/store/schedules-slice/schedules-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { getLessons } from '@/store/lessons-slice/lessons-selector';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';

import { capitalizeString, getCurrentWeekDates } from '@/utils';
import { Hour } from '@/const/lessons';

import { Schedule, ScheduleId } from '@/types/schedules';
import { GradeId } from '@/types/grades';

export type SchedulesModal = {
  isCreating: boolean;
  isEditting: boolean;
  isDeleting: boolean;
  schedule?: Schedule;
  id?: ScheduleId;
  date?: string;
  hour?: keyof typeof Hour;
  grade_id?: GradeId;
  teacher_id?: GradeId;
};

function SchedulesPage(): JSX.Element {
  const schedules = useAppSelector(getSchedules);
  const grades = useAppSelector(getGrades);
  const dispatch = useAppDispatch();
  const lessons = useAppSelector(getLessons);
  const users = useAppSelector(getUsers);
  const [currentWeek, setCurrentWeek] = useState(0);
  const weekDates = getCurrentWeekDates(currentWeek);
  const [modal, setModal] = useState<SchedulesModal>({
    isCreating: false,
    isEditting: false,
    isDeleting: false,
  });

  useEffect(() => {
    if (!schedules.data && !schedules.isFetching) dispatch(fetchSchedulesAction());
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
    if (!lessons.data && !lessons.isFetching) dispatch(fetchLessonsAction());
  }, [dispatch, grades.data, grades.isFetching, lessons.data, lessons.isFetching, schedules.data, schedules.isFetching, users.data, users.isFetching]);

  if (!grades.data) {
    return (
      <PageLayout>
        <Spinner className="w-8 h-8" />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <main className="pt-4 pb-40">
        <header className="flex justify-between px-3 items-end mb-1">
          <h1 className="title">
            Расписание занятий
          </h1>
        </header>

        <div className="rounded-md shadow border bg-white py-1">
          <table className="flex flex-col w-full">
            <thead
              className="sticky top-0 z-10 bg-gray-100 shadow overflow-x-auto no-scrollbar"
              onScroll={(evt: BaseSyntheticEvent) => {
                evt.target.nextElementSibling.scrollLeft = evt.target.scrollLeft;
                evt.target.nextElementSibling.nextElementSibling.scrollLeft = evt.target.scrollLeft;
              }}
            >
              <tr>
                <th className="p-2 min-w-10 w-10"></th>
                <th className="p-2 min-w-[91px]"></th>

                {grades.data?.map((grade) => (
                  <th
                    key={grade.id}
                    className="p-2 min-w-[260px] w-[260px] max-w-[260px] text-center"
                  >
                    {grade.level} {grade.group}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody
              className="overflow-x-auto no-scrollbar"
              onScroll={(evt: BaseSyntheticEvent) => {
                evt.target.nextElementSibling.scrollLeft = evt.target.scrollLeft;
                evt.target.previousElementSibling.scrollLeft = evt.target.scrollLeft;
              }}
            >
              {weekDates.map((date) => (
                <Fragment key={date.format('YYYY-MM-DD')}>
                  <tr
                    className={classNames(
                      dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') && 'bg-green-50'
                    )}
                  >
                    <td
                      className="relative min-w-10 w-10 max-w-10 p-2"
                      rowSpan={9}
                    >
                      <div className="absolute left-1/2 top-1/2 flex gap-2 min-w-max text-gray-500 -translate-x-1/2 -translate-y-1/2 -rotate-90">
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
                      <td className="p-2 w-[92px] border-l">
                        {hour}
                      </td>
                      <td className="p-2 w-[92px] border-l">
                        <LessonHour hour={+hour as keyof typeof Hour} />
                      </td>

                      {grades.data?.map((grade) => (
                        <td
                          key={grade.id}
                          className="relative z-0 p-2 border-l min-w-[260px] w-[260px] max-w-[260px]"
                        >
                          {schedules.data && lessons.data && users.data && (
                            <ScheduleItem
                              date={date}
                              hour={+hour as keyof typeof Hour}
                              grade={grade}
                              lessons={lessons.data}
                              teachers={users.data.filter((user) => user.role === 'teacher')}
                              schedules={schedules.data}
                              setModal={setModal}
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>

            <tfoot
              className="sticky bottom-[48px] z-10 overflow-x-auto bg-white styled-scrollbar mb-[-1px]"
              onScroll={(evt: BaseSyntheticEvent) => {
                evt.target.previousElementSibling.scrollLeft = evt.target.scrollLeft;
                evt.target.previousElementSibling.previousElementSibling.scrollLeft = evt.target.scrollLeft;
              }}
            >
              <tr>
                <th className="p-0 border-b min-w-10 w-10"></th>
                <th className="p-0 border-b min-w-[91px]"></th>

                {grades.data?.map((grade) => (
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
                onClick={() => setCurrentWeek((prev) => --prev)}
              >
                <Icons.previous width={7} />
                <span className="sr-only md:not-sr-only">Предыдущая неделя</span>
              </button>
              <button
                className="flex justify-center items-center gap-x-2 h-8 border-transparent rounded-md border transform disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => setCurrentWeek((prev) => ++prev)}
              >
                <span className="sr-only md:not-sr-only">Следующая неделя</span>
                <Icons.next width={7} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Modal isOpen={modal.isCreating || modal.isEditting || modal.isDeleting}>
        {modal.isCreating && (
          <ScheduleCreateForm
            modal={modal}
            setModal={setModal}
          />
        )}
        {modal.isEditting && (
          <ScheduleEditForm
            modal={modal}
            setModal={setModal}
          />
        )}
        {modal.isDeleting && (
          <ScheduleDeleteForm
            modal={modal}
            setModal={setModal}
          />
        )}
      </Modal>
    </PageLayout >
  );
}

export default SchedulesPage;
