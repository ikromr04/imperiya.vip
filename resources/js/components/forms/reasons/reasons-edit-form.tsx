import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { ReasonUpdateDTO } from '@/dto/reasons';
import { useAppDispatch } from '@/hooks';
import { updateReasonAction } from '@/store/reasons-slice/reasons-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Обязательное поле.'),
});

type ReasonsEditFormProps = {
  dto: ReasonUpdateDTO;
  setDTO: Dispatch<SetStateAction<ReasonUpdateDTO | null>>;
};

function ReasonsEditForm({
  dto,
  setDTO,
}: ReasonsEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: ReasonUpdateDTO = {
    id: dto.id,
    description: dto.description,
  };

  const onSubmit = async (
    values: ReasonUpdateDTO,
    helpers: FormikHelpers<ReasonUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateReasonAction({
      dto: values,
      onSuccess: () => {
        toast.success('Причина успешно обновлена.');
        setDTO(null);
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
            <h3 className="title">Редактирование</h3>

            <Button
              className="ml-auto"
              type="reset"
              variant="danger"
              icon="close"
              onClick={() => setDTO(null)}
            >
              <span className="sr-only">Отмена</span>
            </Button>
          </div>

          <TextField
            className="mb-4"
            name="description"
            label="Описание"
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

export default ReasonsEditForm;
