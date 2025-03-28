import { SchedulesModal } from '@/pages/schedules-page/schedules-page';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/checkbox';
import SelectField from '@/components/ui/formik-controls/select-field';
import { ScheduleStoreDTO } from '@/dto/schedules';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';
import { getLessons } from '@/store/lessons-slice/lessons-selector';
import { storeScheduleAction } from '@/store/schedules-slice/schedules-api-actions';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import dayjs from 'dayjs';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';

type ScheduleCreateFormProps = {
  modal: SchedulesModal;
  setModal: Dispatch<SetStateAction<SchedulesModal>>;
};

function ScheduleCreateForm({
  modal,
  setModal,
}: ScheduleCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const lessons = useAppSelector(getLessons);
  const initialValues: ScheduleStoreDTO = {
    date: dayjs(modal.date).format('YYYY-MM-DD'),
    hour: modal.hour || 8,
    grade_id: modal.grade_id || 0,
  };

  useEffect(() => {
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
    if (!lessons.data && !lessons.isFetching) dispatch(fetchLessonsAction());
  }, [dispatch, lessons.data, lessons.isFetching, users.data, users.isFetching]);

  const onSubmit = async (
    values: ScheduleStoreDTO,
    helpers: FormikHelpers<ScheduleStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeScheduleAction({
      dto: values,
      onSuccess: () => {
        toast.success('Расписание успешно добавлено.');
        setModal({
          isCreating: false,
          isEditting: false,
          isDeleting: false,
        });
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
            <h3 className="title">Добавление расписания</h3>

            <Button
              className="ml-auto"
              type="reset"
              variant="danger"
              icon="close"
              onClick={() => setModal({
                isCreating: false,
                isEditting: false,
                isDeleting: false,
              })}
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
                searchable
                options={users.data.filter((user) => user.role === 'teacher').map((user) => ({ value: user.id, label: user.name }))}
              />
            )}

            <Checkbox
              className="col-span-2"
              name="all"
              label="Добавить везде"
            />
          </div>

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              icon="add"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
            >
              Добавить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ScheduleCreateForm;
