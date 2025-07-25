import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { BookCategoryUpdateDTO } from '@/dto/books';
import { useAppDispatch } from '@/hooks';
import { updateBookCategoryAction } from '@/store/books-slice/books-api-actions';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Обязательное поле.'),
});

type BookCategoriesEditFormProps = {
  dto: BookCategoryUpdateDTO;
  setDTO: Dispatch<SetStateAction<BookCategoryUpdateDTO | null>>;
};

function BookCategoriesEditForm({
  dto,
  setDTO,
}: BookCategoriesEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: BookCategoryUpdateDTO = {
    id: dto.id,
    title: dto.title,
  };

  const onSubmit = async (
    values: BookCategoryUpdateDTO,
    helpers: FormikHelpers<BookCategoryUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateBookCategoryAction({
      dto: values,
      onSuccess: () => {
        toast.success('Категория успешно обновлена.');
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
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BookCategoriesEditForm;
