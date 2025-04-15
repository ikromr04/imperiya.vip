import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { useAppDispatch } from '@/hooks';
import { deleteSubjectAction } from '@/store/subjects-slice/subjects-api-actions';
import { SubjectId } from '@/types/subjects';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type SubjectsDeleteFormProps = {
  dto: SubjectId;
  setDTO: Dispatch<SetStateAction<SubjectId | null>>;
};

function SubjectsDeleteForm({
  dto,
  setDTO,
}: SubjectsDeleteFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: object,
    helpers: FormikHelpers<object>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteSubjectAction({
      id: dto,
      onSuccess: () => {
        toast.success('Предмет успешно удален.');
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
            <h3 className="title">Редактирование предмета</h3>

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
            Вы уверены что хотите удалить этот предмет?
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

export default SubjectsDeleteForm;
