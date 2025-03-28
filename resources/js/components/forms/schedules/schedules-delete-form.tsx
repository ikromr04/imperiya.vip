import { SchedulesModal } from '@/pages/schedules-page/schedules-page';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/checkbox';
import { ScheduleUpdateDTO } from '@/dto/schedules';
import { useAppDispatch } from '@/hooks';
import { deleteScheduleAction } from '@/store/schedules-slice/schedules-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type ScheduleDeleteFormProps = {
  modal: SchedulesModal;
  setModal: Dispatch<SetStateAction<SchedulesModal>>;
};

function ScheduleDeleteForm({
  modal,
  setModal,
}: ScheduleDeleteFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: ScheduleUpdateDTO = {
    id: modal.schedule?.id || 0,
  };

  const onSubmit = async (
    values: ScheduleUpdateDTO,
    helpers: FormikHelpers<ScheduleUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteScheduleAction({
      dto: values,
      onSuccess: () => {
        toast.success('Расписание успешно обновлен.');
        setModal({
          isCreating: false,
          isEditting: false,
          isDeleting: false,
        });
      },
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
            <h3 className="title">Удаление расписания</h3>

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

          <p>Вы уверены что хотите удалить это расписание?</p>

          <Checkbox
            className="col-span-2"
            name="all"
            label="Удалить везде"
          />

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              icon="delete"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="danger"
            >
              Удалить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ScheduleDeleteForm;
