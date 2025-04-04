import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/checkbox';
import SelectField from '@/components/ui/formik-controls/select-field';
import { ScheduleUpdateDTO } from '@/dto/schedules';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';
import { getLessons } from '@/store/lessons-slice/lessons-selector';
import { updateScheduleAction } from '@/store/schedules-slice/schedules-api-actions';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { Schedules } from '@/types/schedules';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';

type ScheduleEditFormProps = {
  week: number;
  dto: ScheduleUpdateDTO;
  setDTO: Dispatch<SetStateAction<ScheduleUpdateDTO | null>>;
  setSchedules: Dispatch<SetStateAction<Schedules | null>>;
};

function ScheduleEditForm({
  week = 0,
  dto,
  setDTO,
  setSchedules,
}: ScheduleEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const lessons = useAppSelector(getLessons);
  const initialValues: ScheduleUpdateDTO = {
    id: dto.id,
    lesson_id: dto.lesson_id,
    teacher_id: dto.teacher_id,
  };

  useEffect(() => {
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
    if (!lessons.data && !lessons.isFetching) dispatch(fetchLessonsAction());
  }, [dispatch, lessons.data, lessons.isFetching, users.data, users.isFetching]);

  const onSubmit = async (
    values: ScheduleUpdateDTO,
    helpers: FormikHelpers<ScheduleUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateScheduleAction({
      week,
      dto: values,
      onSuccess: (schedules) => {
        toast.success('Расписание успешно обновлен.');
        setDTO(null);
        setSchedules(schedules);
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => toast.success(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Редактирование расписания</h3>

            <Button
              className="ml-auto"
              type="reset"
              variant="danger"
              icon="close"
              onClick={() => setDTO(null)}
            >
              <span className="sr-only">Отмена</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
            {lessons.data && (
              <SelectField
                name="lesson_id"
                label="Урок"
                searchable
                options={lessons.data.map((lesson) => ({ value: lesson.id, label: lesson.name }))}
              />
            )}

            {users.data && (
              <SelectField
                name="teacher_id"
                label="Преподователь"
                options={users.data.filter((user) => user.role === 'teacher').map((user) => ({ value: user.id, label: user.name }))}
              />
            )}

            <Checkbox
              className="col-span-2"
              name="all"
              label="Редактировать везде"
            />
          </div>

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              icon="edit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
            >
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ScheduleEditForm;
