import * as Yup from 'yup';
import Button from '@/components/ui/button';
import ContentField from '@/components/ui/formik-controls/content-field';
import SelectField from '@/components/ui/formik-controls/select-field';
import { Attendance } from '@/const/marks';
import { MarkStoreDTO } from '@/dto/marks';
import { useAppDispatch } from '@/hooks';
import { storeMarkAction } from '@/store/marks-slice/marks-api-actions';
import { Option } from '@/types';
import { LessonId } from '@/types/lessons';
import { Mark } from '@/types/marks';
import { UserId } from '@/types/users';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import TextField from '@/components/ui/formik-controls/text-field';

const validationSchema = Yup.object().shape({
  attendance: Yup.string().required('Укажите посещаемость.'),
});

type MarksCreateFormProps = {
  studentId: UserId;
  lessonId: LessonId;
  onSuccess?: (mark: Mark) => void
};

function MarksCreateForm({
  studentId,
  lessonId,
  onSuccess,
}: MarksCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: MarkStoreDTO = {
    student_id: studentId,
    lesson_id: lessonId,
    attendance: '',
  };

  const onSubmit = async (
    values: MarkStoreDTO,
    helpers: FormikHelpers<MarkStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeMarkAction({
      dto: values,
      onSuccess: (mark) => {
        if (onSuccess) onSuccess(mark);
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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="flex flex-col px-2 gap-2">
          <SelectField
            name="attendance"
            label="Посещаемость"
            onChange={(option) => {
              const value = (option as Option).value;

              if (!['P', 'L'].includes(value.toString())) {
                setFieldValue('score_1', null);
              }

              setFieldValue('attendance', value);
            }}
            options={Object.entries(Attendance).map(([key, value]) => ({ value: key, label: value }))}
          />
          {values.attendance && ['P', 'L'].includes(values.attendance) && (
            <div className="flex gap-x-2 items-center">
              <TextField
                className="grow min-w-0"
                name="score_1"
                label="Оценка 1"
                cleanable
                // onClean={() => setFieldValue('score_1', null)}
                // options={[2, 3, 4, 5].map((score) => ({ value: score, label: score.toString() }))}
              />
              <span className="translate-y-2">/</span>
              <TextField
                className="grow min-w-0"
                name="score_2"
                label="Оценка 2"
                cleanable
                // onClean={() => setFieldValue('score_2', null)}
                // options={[2, 3, 4, 5].map((score) => ({ value: score, label: score.toString() }))}
              />
            </div>
          )}

          <ContentField
            name="comment"
            label="Комментарий"
          />

          <div className="flex items-center justify-end gap-2 -mt-1">
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

export default MarksCreateForm;
