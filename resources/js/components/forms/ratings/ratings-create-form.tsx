import * as Yup from 'yup';
import Button from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Rating } from '@/types/ratings';
import { RatingStoreDTO } from '@/dto/ratings';
import { storeRatingAction } from '@/store/ratings-slice/ratings-api-actions';
import TextField from '@/components/ui/formik-controls/text-field';

const validationSchema = Yup.object().shape({
  score: Yup.number().required(''),
});

type RatingsCreateFormProps = {
  dto: RatingStoreDTO;
  onSuccess?: (rating: Rating) => void
};

function RatingsCreateForm({
  dto,
  onSuccess,
}: RatingsCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: RatingStoreDTO = dto;

  const onSubmit = async (
    values: RatingStoreDTO,
    helpers: FormikHelpers<RatingStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeRatingAction({
      dto: values,
      onSuccess: (createdRating) => {
        if (onSuccess) onSuccess(createdRating);
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
      {({ isSubmitting }) => (
        <Form className="flex flex-col px-2 gap-2">
          <TextField
            className="grow"
            name="score"
            label="Оценка"
            autoFocus
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

export default RatingsCreateForm;
