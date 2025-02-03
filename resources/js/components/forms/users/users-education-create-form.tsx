import Button from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { User } from '@/types/users';
import { Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле.'),
  login: Yup.string().required('Обязательное поле.'),
  email: Yup.string().email('Неверный адрес электронной почты.'),
});

type UsersEducationCreateFormProps = {
  user: User;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function UsersEducationCreateForm({
  user,
  setIsOpen,
}: UsersEducationCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      key={user.id}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-end gap-2 mt-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
            >
              Сохранить
            </Button>
            <Button
              type="reset"
              onClick={() => setIsOpen(false)}
              variant="error"
            >
              Отмена
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default UsersEducationCreateForm;
