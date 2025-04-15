import Button from '@/components/ui/button';
import SelectField from '@/components/ui/formik-controls/select-field';
import TextField from '@/components/ui/formik-controls/text-field';
import { UserUpdateDTO } from '@/dto/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateUserAction } from '@/store/users-slice/users-api-actions';
import { Sex, User } from '@/types/users';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { REGIONS, SexName } from '@/const/users';
import { getNationalities } from '@/store/nationalities-slice/nationalities-selector';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import Label from '@/components/ui/formik-controls/partials/label';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно для заполнения.'),
  surname: Yup.string().required('Фамилия обязательна для заполнения.'),
  sex: Yup.string().required('Укажите пол.'),
  login: Yup.string().required('Обязательное поле.'),
  email: Yup.string().email('Неверный адрес электронной почты.'),
  birth_date: Yup.string().required('Укажите дату рождения.'),
  nationality_id: Yup.number()
    .required('Укажите национальность.')
    .min(1, 'Укажите национальность.'),
  address: Yup.object({
    physical_address: Yup.string().required('Фактический адрес обязателен.'),
    region: Yup.string().required('Укажите регион.'),
  }),
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
    surname: user.surname,
    patronymic: user.patronymic,
    login: user.login,
    sex: user.sex,
    birth_date: user.birthDate,
    nationality_id: user.nationalityId,
    email: user.email,
    address: {
      physical_address: user.address?.physicalAddress || '',
      region: user.address?.region || '',
    },
    whatsapp: user.whatsapp,
  };

  useEffect(() => {
    if (!nationalities.data && !nationalities.isFetching) dispatch(fetchNationalitiesAction());
  }, [dispatch, nationalities.data, nationalities.isFetching]);

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
        <Form className="flex flex-col gap-3 md:grid md:grid-cols-2">
          <TextField name="name" label="Имя" required />
          <TextField name="surname" label="Фамилия" required />

          <TextField name="patronymic" label="Очество" />

          <TextField name="login" label="Логин" required />

          <SelectField
            name="sex"
            label="Пол"
            cleanable
            onClean={() => setFieldValue('sex', '')}
            options={['male', 'female'].map((sex) => ({ value: sex, label: SexName[sex as Sex] }))}
            required
          />

          <TextField name="email" label="Электронная почта" />

          <TextField
            name="birth_date"
            type="date"
            label="Дата рождения"
            required
          />

          {nationalities.data && (
            <SelectField
              name="nationality_id"
              label="Национальность"
              cleanable
              onClean={() => setFieldValue('nationality_id', 0)}
              options={nationalities.data.map((nationality) => ({ value: nationality.id, label: nationality.name }))}
            />
          )}

          <TextField
            className="md:col-span-2"
            name="address.physical_address"
            label="Адрес проживания (фактический)"
            required
          />
          <SelectField
            name="address.region"
            label="Район"
            options={REGIONS.map((region) => ({ value: region, label: region }))}
            required
          />

          <div className="flex flex-col">
            <Label label="WhatsApp" />

            <div className="flex gap-1 w-full">
              <div className="relative">
                <TextField
                  className="w-[88px]"
                  inputClassname="pl-7"
                  type="number"
                  name="whatsapp.code"
                  placeholder="Код"
                  required
                />
                <span className="absolute top-4 left-3 -translate-y-1/2 text-xl">+</span>
              </div>
              <TextField
                className="w-[120px] grow"
                type="number"
                name="whatsapp.numbers"
                placeholder="Номер"
                required
              />
            </div>
          </div>

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

export default UsersEditForm;
