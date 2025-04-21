import Button from '@/components/ui/button';
import ContentField from '@/components/ui/formik-controls/content-field';
import SelectField from '@/components/ui/formik-controls/select-field';
import TextField from '@/components/ui/formik-controls/text-field';
import { Attendance } from '@/const/marks';
import { MarkUpdateDTO } from '@/dto/marks';
import { useAppDispatch } from '@/hooks';
import { updateMarkAction } from '@/store/marks-slice/marks-api-actions';
import { Option } from '@/types';
import { Mark } from '@/types/marks';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

type MarksEditFormProps = {
  mark: Mark;
  onSuccess?: (mark: Mark) => void
};

function MarksEditForm({
  mark,
  onSuccess,
}: MarksEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: MarkUpdateDTO = {
    id: mark.id,
    score_1: mark.score1,
    score_2: mark.score2,
    attendance: mark.attendance,
    comment: mark.comment,
  };

  const onSubmit = async (
    values: MarkUpdateDTO,
    helpers: FormikHelpers<MarkUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateMarkAction({
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
                setFieldValue('score_2', null);
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
                // cleanable
                // onClean={() => setFieldValue('score_1', null)}
                // options={[2, 3, 4, 5].map((score) => ({ value: score, label: score.toString() }))}
              />
              <span className="translate-y-2">/</span>
              <TextField
                className="grow min-w-0"
                name="score_2"
                label="Оценка 2"
                // cleanable
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

export default MarksEditForm;
