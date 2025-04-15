import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { NationalityStoreDTO } from '@/dto/nationalities';
import { useAppDispatch } from '@/hooks';
import { storeNationalityAction } from '@/store/nationalities-slice/nationalities-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле.'),
});

type NationalitiesCreateFormProps = {
  dto: NationalityStoreDTO;
  setDTO: Dispatch<SetStateAction<NationalityStoreDTO | null>>;
};

function NationalitiesCreateForm({
  dto,
  setDTO,
}: NationalitiesCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: NationalityStoreDTO = {
    name: dto.name,
  };

  const onSubmit = async (
    values: NationalityStoreDTO,
    helpers: FormikHelpers<NationalityStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeNationalityAction({
      name: values.name,
      onSuccess: () => {
        toast.success('Национальность успешно добавлена.');
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
            <h3 className="title">Добавление национальности</h3>

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
              Добавить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NationalitiesCreateForm;
