import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { SubjectStoreDTO } from '@/dto/subjects';
import { useAppDispatch } from '@/hooks';
import { storeSubjectAction } from '@/store/subjects-slice/subjects-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле.'),
});

type SubjectsCreateFormProps = {
  dto: SubjectStoreDTO;
  setDTO: Dispatch<SetStateAction<SubjectStoreDTO | null>>;
};

function SubjectsCreateForm({
  dto,
  setDTO,
}: SubjectsCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: SubjectStoreDTO = {
    name: dto.name,
  };

  const onSubmit = async (
    values: SubjectStoreDTO,
    helpers: FormikHelpers<SubjectStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeSubjectAction({
      name: values.name,
      onSuccess: () => {
        toast.success('Предмет успешно добавлен.');
        setDTO(null);
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => toast.success(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Добавление предмета</h3>

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

          <TextField
            className="mb-4"
            name="name"
            label="Название предмета"
            required
          />

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              icon="edit"
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

export default SubjectsCreateForm;
