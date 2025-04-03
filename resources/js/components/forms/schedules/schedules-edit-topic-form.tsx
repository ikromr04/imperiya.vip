import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { ScheduleUpdateDTO } from '@/dto/schedules';
import { useAppDispatch } from '@/hooks';
import { updateScheduleAction } from '@/store/schedules-slice/schedules-api-actions';
import { Schedule } from '@/types/schedules';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

type ScheduleEditTopicFormProps = {
  schedule: Schedule;
};

function ScheduleEditTopicForm({
  schedule,
}: ScheduleEditTopicFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: ScheduleUpdateDTO = {
    id: schedule.id,
    topic: schedule.topic,
    homework: schedule.homework,
  };

  const onSubmit = async (
    values: ScheduleUpdateDTO,
    helpers: FormikHelpers<ScheduleUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateScheduleAction({
      dto: values,
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
        <Form className="flex flex-col gap-1">
          <TextField
            name="topic"
            label="Тема:"
          />

          <TextField
            name="homework"
            label="Домашнее задание"
          />

          <div className="flex items-center justify-end gap-2 sm:col-span-2 mt-1">
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

export default ScheduleEditTopicForm;
