import Button from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { deleteRegisterLinkAction } from '@/store/auth-slice/auth-api-actions';
import { RegisterLinkId } from '@/types/auth';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type RegisterLinkDeleteFormProps = {
  id: RegisterLinkId;
  setId: Dispatch<SetStateAction<RegisterLinkId | null>>;
};

function RegisterLinkDeleteForm({
  id,
  setId,
}: RegisterLinkDeleteFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: object,
    helpers: FormikHelpers<object>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteRegisterLinkAction({
      id,
      onSuccess: () => setId(null),
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      key={id}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Удаление ссылки</h3>

            <Button
              className="ml-auto"
              type="reset"
              icon="close"
              variant="danger"
              onClick={() => setId(null)}
            >
              <span className="sr-only">Отмена</span>
            </Button>
          </div>

          <div className="mb-4">
            <p className="mb-2">Вы уверены что хотите удалить эту ссылку?</p>
          </div>

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
              icon="delete"
            >
              Удалить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterLinkDeleteForm;
