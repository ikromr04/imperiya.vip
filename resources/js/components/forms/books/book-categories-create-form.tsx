import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { BookCategoryStoreDTO } from '@/dto/books';
import { useAppDispatch } from '@/hooks';
import { storeBookCategoryAction } from '@/store/books-slice/books-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Обязательное поле.'),
});

type BookCategoriesCreateFormProps = {
  dto: BookCategoryStoreDTO;
  setDTO: Dispatch<SetStateAction<BookCategoryStoreDTO | null>>;
};

function BookCategoriesCreateForm({
  dto,
  setDTO,
}: BookCategoriesCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: BookCategoryStoreDTO = {
    title: dto.title,
  };

  const onSubmit = async (
    values: BookCategoryStoreDTO,
    helpers: FormikHelpers<BookCategoryStoreDTO>,
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeBookCategoryAction({
      title: values.title,
      onSuccess: () => {
        toast.success('Категория успешно добавлена.');
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
            <h3 className="title">Добавление категории</h3>

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
            name="title"
            label="Название"
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

export default BookCategoriesCreateForm;
