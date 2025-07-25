import Button from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { deleteReasonAction } from '@/store/reasons-slice/reasons-api-actions';
import { ReasonId } from '@/types/reasons';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type ReasonsDeleteFormProps = {
  dto: ReasonId;
  setDTO: Dispatch<SetStateAction<ReasonId | null>>;
};

function ReasonsDeleteForm({
  dto,
  setDTO,
}: ReasonsDeleteFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: object,
    helpers: FormikHelpers<object>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteReasonAction({
      id: dto,
      onSuccess: () => {
        toast.success('Причина успешно удалена.');
        setDTO(null);
      },
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Удалить причину</h3>

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

          <p>
            Вы уверены что хотите удалить?
          </p>

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              icon="edit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
            >
              Удалить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ReasonsDeleteForm;
