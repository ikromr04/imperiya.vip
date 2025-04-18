import Button from '@/components/ui/button';
import SelectField from '@/components/ui/formik-controls/select-field';
import { RatingUpdateDTO } from '@/dto/ratings';
import { useAppDispatch } from '@/hooks';
import { updateRatingAction } from '@/store/ratings-slice/ratings-api-actions';
import { Rating } from '@/types/ratings';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

type RatingsEditFormProps = {
  rating: Rating;
  onSuccess?: (rating: Rating) => void
};

function RatingsEditForm({
  rating,
  onSuccess,
}: RatingsEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: RatingUpdateDTO = {
    id: rating.id,
    score: rating.score,
  };

  const onSubmit = async (
    values: RatingUpdateDTO,
    helpers: FormikHelpers<RatingUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateRatingAction({
      dto: values,
      onSuccess: (rating) => {
        if (onSuccess) onSuccess(rating);

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
      {({ isSubmitting }) => (
        <Form className="flex flex-col px-2 gap-2">
          <SelectField
            className="grow"
            name="score"
            label="Оценка"
            options={[2, 3, 4, 5].map((score) => ({ value: score, label: score.toString() }))}
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

export default RatingsEditForm;
