import Button from '@/components/ui/button';
import SelectField from '@/components/ui/form-controls/formik/select-field';
import TextField from '@/components/ui/form-controls/formik/text-field';
import { UserUpdateDTO } from '@/dto/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateUserAction } from '@/store/users-slice/users-api-actions';
import { Sex, User } from '@/types/users';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { SexName } from '@/const/users';
import { getNationalities } from '@/store/users-slice/users-selector';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле.'),
  login: Yup.string().required('Обязательное поле.'),
  email: Yup.string().email('Неверный адрес электронной почты.'),
  sex: Yup.string().required('Обязательное поле.'),
});

type UsersEditFormProps = {
  user: User;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function UsersEditForm({
  user,
  setIsOpen,
}: UsersEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const nationalities = useAppSelector(getNationalities);
  const initialValues: UserUpdateDTO = {
    id: user.id,
    name: user.name,
    login: user.login,
    email: user.email,
    birth_date: user.birthDate,
    address: user.address,
    sex: user.sex,
    nationality: user.nationality,
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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      key={user.id}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-3">
          <TextField name="name" label="ФИО" required />

          <div className="grid gap-y-2 gap-x-4 md:grid-cols-2">
            <TextField name="login" label="Логин" required />

            <TextField name="email" label="Электронная почта" />
          </div>

          <div className="grid gap-y-2 gap-x-4 md:grid-cols-3">
            <SelectField
              name="sex"
              label="Пол"
              cleanable
              onClean={() => setFieldValue('sex', '')}
              options={['male', 'female'].map((sex) => ({ value: sex, label: SexName[sex as Sex] }))}
              required
            />

            <TextField name="birth_date" type="date" label="Дата рождения" />

            <SelectField
              name="nationality"
              label="Национальность"
              cleanable
              onClean={() => setFieldValue('nationality', '')}
              options={nationalities.map((nationality) => ({ value: nationality, label: nationality }))}
            />
          </div>

          <TextField name="address" label="Адрес" />

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

export default UsersEditForm;
