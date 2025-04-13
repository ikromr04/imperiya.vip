import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { LessonUpdateDTO } from '@/dto/lessons';
import { useAppDispatch } from '@/hooks';
import { updateLessonAction } from '@/store/lessons-slice/lessons-api-actions';
import { Lesson } from '@/types/lessons';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

type LessonsTopicEditFormProps = {
  lesson: Lesson;
};

function LessonsTopicEditForm({
  lesson,
}: LessonsTopicEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: LessonUpdateDTO = {
    id: lesson.id,
    topic: lesson.topic,
    homework: lesson.homework,
  };

  const onSubmit = async (
    values: LessonUpdateDTO,
    helpers: FormikHelpers<LessonUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateLessonAction({
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

export default LessonsTopicEditForm;
