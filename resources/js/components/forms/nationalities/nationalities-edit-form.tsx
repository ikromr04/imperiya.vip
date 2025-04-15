import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { NationalityUpdateDTO } from '@/dto/nationalities';
import { useAppDispatch } from '@/hooks';
import { updateNationalityAction } from '@/store/nationalities-slice/nationalities-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле.'),
});

type NationalitiesEditFormProps = {
  dto: NationalityUpdateDTO;
  setDTO: Dispatch<SetStateAction<NationalityUpdateDTO | null>>;
};

function NationalitiesEditForm({
  dto,
  setDTO,
}: NationalitiesEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: NationalityUpdateDTO = {
    id: dto.id,
    name: dto.name,
  };

  const onSubmit = async (
    values: NationalityUpdateDTO,
    helpers: FormikHelpers<NationalityUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateNationalityAction({
      dto: values,
      onSuccess: () => {
        toast.success('Национальность успешно обновлена.');
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
            name="name"
            label="Национальность"
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

export default NationalitiesEditForm;
