import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { SubjectUpdateDTO } from '@/dto/subjects';
import { useAppDispatch } from '@/hooks';
import { updateSubjectAction } from '@/store/subjects-slice/subjects-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле.'),
});

type SubjectsEditFormProps = {
  dto: SubjectUpdateDTO;
  setDTO: Dispatch<SetStateAction<SubjectUpdateDTO | null>>;
};

function SubjectsEditForm({
  dto,
  setDTO,
}: SubjectsEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: SubjectUpdateDTO = {
    id: dto.id,
    name: dto.name,
  };

  const onSubmit = async (
    values: SubjectUpdateDTO,
    helpers: FormikHelpers<SubjectUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateSubjectAction({
      dto: values,
      onSuccess: () => {
        toast.success('Предмет успешно обновлен.');
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
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SubjectsEditForm;
