import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import SelectField from '@/components/ui/formik-controls/select-field';
import TextField from '@/components/ui/formik-controls/text-field';
import { LessonUpdateDTO } from '@/dto/lessons';
import { useAppDispatch } from '@/hooks';
import { updateLessonAction } from '@/store/lessons-slice/lessons-api-actions';
import { Lesson, Types } from '@/types/lessons';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type LessonsJournalEditFormProps = {
  lesson: Lesson;
  types: Types;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function LessonsJournalEditForm({
  lesson,
  setIsOpen,
  types,
}: LessonsJournalEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const initialValues: LessonUpdateDTO = {
    id: lesson.id,
    topic: lesson.topic,
    homework: lesson.homework,
    type_id: lesson.typeId,
  };

  const onSubmit = async (
    values: LessonUpdateDTO,
    helpers: FormikHelpers<LessonUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateLessonAction({
      dto: values,
      onSuccess: () => {
        setIsOpen(false);
        toast.success('Данные успешно сохранены.');
      },
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
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-2">
          <div className="flex justify-between items-center pl-2 pr-1">
            <button
              className="absolute right-1 top-1 border rounded p-1 text-danger"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <Icons.close width={10} height={10} />
            </button>
          </div>

          <hr className="-mx-3" />

          <TextField
            name="topic"
            label="Тема:"
          />

          <TextField
            name="homework"
            label="Домашнее задание:"
          />

          <SelectField
            name="type_id"
            label="Тип:"
            cleanable
            onClean={() => setFieldValue('type_id', null)}
            options={types.map((type) => ({ value: type.id, label: type.name }))}
          />

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
