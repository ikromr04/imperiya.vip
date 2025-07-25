import Button from '@/components/ui/button';
import ContentField from '@/components/ui/formik-controls/content-field';
import SelectField from '@/components/ui/formik-controls/select-field';
import TextField from '@/components/ui/formik-controls/text-field';
import { ACCESS_OPTIONS } from '@/const/books';
import { BookStoreDTO } from '@/dto/books';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { storeBookAction } from '@/store/books-slice/books-api-actions';
import { getBookCategories } from '@/store/books-slice/books-selector';
import { Option } from '@/types';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  category_id: Yup.number().required('Обязательное поле.').min(1, 'Обязательное поле.'),
  title: Yup.string().required('Обязательное поле.'),
  access: Yup.string().required('Обязательное поле.'),
  lang: Yup.string().required('Обязательное поле.'),
});

type BooksCreateFormProps = {
  dto: BookStoreDTO;
  setDTO: Dispatch<SetStateAction<BookStoreDTO | null>>;
};

function BooksCreateForm({
  dto,
  setDTO,
}: BooksCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: BookStoreDTO = dto;
  const categories = useAppSelector(getBookCategories);
  const fileRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (
    values: BookStoreDTO,
    helpers: FormikHelpers<BookStoreDTO>,
  ) => {
    helpers.setSubmitting(true);

    const formData = new FormData();
    formData.append('category_id', String(values.category_id));
    formData.append('title', values.title);
    formData.append('access', values.access);
    formData.append('lang', values.lang);
    if (fileRef.current?.files?.[0]) formData.append('file', fileRef.current.files[0]);
    if (values.link) formData.append('link', values.link);
    if (values.description) formData.append('description', values.description);

    await dispatch(storeBookAction({
      formData,
      onSuccess: () => {
        toast.success('Книга успешно добавлена.');
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
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Добавление книги</h3>

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

          {categories && (
            <SelectField
              className="mb-4"
              name="category_id"
              label="Укажите категорию"
              onChange={(value) => setFieldValue('category_id', (value as Option).value)}
              options={categories.map((category) => ({ value: category.id, label: category.title }))}
              required
            />
          )}

          <SelectField
            className="mb-4"
            name="access"
            label="Выберите доступность"
            onChange={(value) => setFieldValue('access', (value as Option).value)}
            options={ACCESS_OPTIONS}
            required
          />

          <SelectField
            className="mb-4"
            name="lang"
            label="Укажите язык"
            onChange={(value) => setFieldValue('lang', (value as Option).value)}
            options={['Русский', 'Таджикский', 'Английский', 'Немецкий'].map((lang) => ({ value: lang, label: lang }))}
            required
          />

          <ContentField
            className="mb-4"
            name="description"
            label="Описание"
          />

          <TextField
            className="mb-4"
            inputClassname="!p-1 dassfas"
            name="link"
            label="Ссылка"
          />

          <div className="flex flex-col mb-4">
            <label className="relative z-0 rounded flex leading-none mb-[2px] max-w-max text-sm text-gray-500 ml-2">
              Загрузить книгу
            </label>

            <div className="relative flex">
              <input
                ref={fileRef}
                className="flex grow bg-gray-50 min-w-0 border border-gray-200 rounded h-8 leading-none text-base focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100 p-1"
                type="file"
                name="file"
                accept=".pdf"
              />
            </div>
          </div>

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

export default BooksCreateForm;
