import Button from '@/components/ui/button';
import SelectField from '@/components/ui/formik-controls/select-field';
import TextField from '@/components/ui/formik-controls/text-field';
import { AsyncStatus } from '@/const/store';
import { LessonUpdateDTO } from '@/dto/lessons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchLessonTypesAction, updateLessonsTopicAction } from '@/store/lessons-slice/lessons-api-actions';
import { getLessonTypes, getLessonTypesStatus } from '@/store/lessons-slice/lessons-selector';
import { Lesson } from '@/types/lessons';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

type LessonsJournalEditFormProps = {
  dto: LessonUpdateDTO;
  onSuccess?: (updatedLesson: Lesson) => void
};

function LessonsJournalEditForm({
  dto,
  onSuccess,
}: LessonsJournalEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const lessonTypesStatus = useAppSelector(getLessonTypesStatus);
  const lessonTypes = useAppSelector(getLessonTypes);

  useEffect(() => {
    if (lessonTypesStatus === AsyncStatus.Idle) dispatch(fetchLessonTypesAction());
  }, [dispatch, lessonTypesStatus]);

  const onSubmit = async (
    values: LessonUpdateDTO,
    helpers: FormikHelpers<LessonUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateLessonsTopicAction({
      dto: values,
      onSuccess: (updatedLesson) => {
        if (onSuccess) onSuccess(updatedLesson);
        toast.success('Данные успешно сохранены.');
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => toast.success(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={dto}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-2">
          <TextField name="topic" label="Тема:" />

          <TextField name="homework" label="Домашнее задание:" />

          {lessonTypes && (
            <SelectField
              name="type_id"
              label="Тип:"
              cleanable
              onClean={() => setFieldValue('type_id', null)}
              options={lessonTypes.map((type) => ({ value: type.id, label: type.name }))}
            />
          )}

          <div className="flex items-center justify-end gap-2 sm:col-span-2 -mt-1">
            <Button
              className="!h-8 bg-transparent !text-success shadow-none hover:!bg-transparent"
              type="submit"
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

export default LessonsJournalEditForm;
