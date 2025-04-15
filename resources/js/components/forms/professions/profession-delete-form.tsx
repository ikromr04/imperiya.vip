import Button from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { deleteProfessionAction } from '@/store/professions-slice/professions-api-actions';
import { ProfessionId } from '@/types/professions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type ProfessionsDeleteFormProps = {
  dto: ProfessionId;
  setDTO: Dispatch<SetStateAction<ProfessionId | null>>;
};

function ProfessionsDeleteForm({
  dto,
  setDTO,
}: ProfessionsDeleteFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: object,
    helpers: FormikHelpers<object>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteProfessionAction({
      id: dto,
      onSuccess: () => {
        toast.success('Сфера деятельности удалена.');
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
            <h3 className="title">Удаление</h3>

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

export default ProfessionsDeleteForm;
