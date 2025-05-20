import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { RatingSlugToText } from '@/const/ratings';
import { RatingDateUpdateDTO } from '@/dto/ratings';
import { useAppDispatch } from '@/hooks';
import { updateRatingDatesAction } from '@/store/ratings-slice/ratings-api-actions';
import { RatingDate } from '@/types/ratings';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

type RatingDatesEditFormProps = {
  ratingDate: RatingDate;
};

function RatingDatesEditForm({
  ratingDate,
}: RatingDatesEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: RatingDateUpdateDTO = {
    id: ratingDate.id,
    years: ratingDate.years,
    quarter1: ratingDate.quarter1,
    quarter2: ratingDate.quarter2,
    semester1: ratingDate.semester1,
    quarter3: ratingDate.quarter3,
    quarter4: ratingDate.quarter4,
    semester2: ratingDate.semester2,
    annual: ratingDate.annual,
    assessment: ratingDate.assessment,
    final: ratingDate.final,
  };

  const onSubmit = async (
    values: RatingDateUpdateDTO,
    helpers: FormikHelpers<RatingDateUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateRatingDatesAction({
      dto: values,
      onSuccess: () => toast.success('Данные успешно сохранены.'),
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
        <Form className="flex flex-col max-w-[1200px] gap-3 bg-white border rounded-md shadow py-4 px-6 md:grid md:grid-cols-3">
          <h2 className="font-semibold text-lg leading-none md:col-span-3">{ratingDate.years}</h2>

          <TextField
            name="quarter1"
            type="date"
            label={RatingSlugToText['quarter1']}
          />

          <TextField
            name="quarter2"
            type="date"
            label={RatingSlugToText['quarter2']}
          />

          <TextField
            name="semester1"
            type="date"
            label={RatingSlugToText['semester1']}
          />

          <TextField
            name="quarter3"
            type="date"
            label={RatingSlugToText['quarter3']}
          />

          <TextField
            name="quarter4"
            type="date"
            label={RatingSlugToText['quarter4']}
          />

          <TextField
            name="semester2"
            type="date"
            label={RatingSlugToText['semester2']}
          />

          <TextField
            name="annual"
            type="date"
            label={RatingSlugToText['annual']}
          />

          <TextField
            name="assessment"
            type="date"
            label={RatingSlugToText['assessment']}
          />

          <TextField
            name="final"
            type="date"
            label={RatingSlugToText['final']}
          />

          <div className="flex items-center justify-end gap-2 md:col-span-3">
            <Button
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

export default RatingDatesEditForm;
