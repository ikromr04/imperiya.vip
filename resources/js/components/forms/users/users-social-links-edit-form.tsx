import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import { UserUpdateDTO } from '@/dto/users';
import { useAppDispatch } from '@/hooks';
import { updateUserAction } from '@/store/users-slice/users-api-actions';
import { User } from '@/types/users';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type UsersSocialLinksEditFormProps = {
  user: User;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function UsersSocialLinksEditForm({
  user,
  setIsOpen,
}: UsersSocialLinksEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: UserUpdateDTO = {
    id: user.id,
    name: user.name,
    login: user.login,
    social_link: {
      facebook: user.socialLink?.facebook || '',
      instagram: user.socialLink?.instagram || '',
      telegram: user.socialLink?.telegram || '',
      odnoklassniki: user.socialLink?.odnoklassniki || '',
    },
    phone_numbers: user.phoneNumbers,
  };

  const onSubmit = async (
    values: UserUpdateDTO,
    helpers: FormikHelpers<UserUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateUserAction({
      dto: values,
      onSuccess: () => {
        toast.success('Данные успешно сохранены.');
        setIsOpen(false);
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextField name="social_link.facebook" label="Фейсбук" />
          <TextField name="social_link.instagram" label="Инстаграм" />
          <TextField name="social_link.telegram" label="Телеграм" />
          <TextField name="social_link.odnoklassniki" label="Одноклассники" />

          <div className="flex items-center justify-end gap-2 mt-6 sm:col-span-2">
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
              variant="danger"
            >
              Отмена
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default UsersSocialLinksEditForm;
