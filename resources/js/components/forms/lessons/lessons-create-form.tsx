import Button from '@/components/ui/button';
import TextField from '@/components/ui/form-controls/formik/text-field';
import { LessonStoreDTO } from '@/dto/lessons';
import { useAppDispatch } from '@/hooks';
import { storeLessonAction } from '@/store/lessons-slice/lessons-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле.'),
});

type LessonsCreateFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function LessonsCreateForm({
  setIsOpen,
}: LessonsCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: LessonStoreDTO = {
    name: '',
  };

  const onSubmit = async (
    values: LessonStoreDTO,
    helpers: FormikHelpers<LessonStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeLessonAction({
      name: values.name,
      onSuccess: () => {
        toast.success('Урок успешно добавлен.');
        setIsOpen(false);
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
            <h3 className="title">Добавление урока</h3>

            <Button
              className="ml-auto"
              type="reset"
              variant="error"
              icon="close"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Отмена</span>
            </Button>
          </div>

          <TextField
            className="mb-4"
            name="name"
            label="Урок"
            required
          />

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

export default LessonsCreateForm;
