import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { LessonUpdateDTO } from '@/dto/subjects';
import { useAppDispatch } from '@/hooks';
import { updateLessonAction } from '@/store/subjects-slice/subjects-api-actions';
import { Lesson } from '@/types/subjects';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле.'),
});

type LessonsEditFormProps = {
  lesson: Lesson;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function LessonsEditForm({
  lesson,
  setIsOpen,
}: LessonsEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: LessonUpdateDTO = {
    id: lesson.id,
    name: lesson.name,
  };

  const onSubmit = async (
    values: LessonUpdateDTO,
    helpers: FormikHelpers<LessonUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateLessonAction({
      dto: values,
      onSuccess: () => {
        toast.success('Урок успешно обновлен.');
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
            <h3 className="title">Редактирование урока</h3>

            <Button
              className="ml-auto"
              type="reset"
              variant="danger"
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

export default LessonsEditForm;
