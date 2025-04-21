import * as Yup from 'yup';
import Button from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { UserId } from '@/types/users';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Rating } from '@/types/ratings';
import { RatingName } from '@/const/ratings';
import { GradeId } from '@/types/grades';
import { SubjectId } from '@/types/subjects';
import { RatingStoreDTO } from '@/dto/ratings';
import { storeRatingAction } from '@/store/ratings-slice/ratings-api-actions';
import TextField from '@/components/ui/formik-controls/text-field';

const validationSchema = Yup.object().shape({
  score: Yup.number().required(''),
});

type RatingsCreateFormProps = {
  createDTO: {
    years: string;
    rating: keyof typeof RatingName;
    studentId: UserId;
    gradeId: GradeId;
    subjectId: SubjectId;
  };
  onSuccess?: (rating: Rating) => void
};

function RatingsCreateForm({
  createDTO,
  onSuccess,
}: RatingsCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: RatingStoreDTO = {
    years: createDTO.years,
    rating: createDTO.rating,
    score: null,
    student_id: createDTO.studentId,
    grade_id: createDTO.gradeId,
    subject_id: createDTO.subjectId,
  };

  const onSubmit = async (
    values: RatingStoreDTO,
    helpers: FormikHelpers<RatingStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeRatingAction({
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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col px-2 gap-2">
          <TextField
            className="grow"
            name="score"
            label="Оценка"
            // options={[2, 3, 4, 5].map((score) => ({ value: score, label: score.toString() }))}
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
