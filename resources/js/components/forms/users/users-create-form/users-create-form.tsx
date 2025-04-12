import Button from '@/components/ui/button';
import Label from '@/components/ui/formik-controls/partials/label';
import SelectField from '@/components/ui/formik-controls/select-field';
import TextField from '@/components/ui/formik-controls/text-field';
import { REGIONS, RoleName, SexName } from '@/const/users';
import { UserStoreDTO } from '@/dto/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import { getNationalities } from '@/store/nationalities-slice/nationalities-selector';
import { storeUserAction } from '@/store/users-slice/users-api-actions';
import { Role, Sex } from '@/types/users';
import { Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно для заполнения.'),
  surname: Yup.string().required('Фамилия обязательна для заполнения.'),
  role: Yup.string().required('Укажите позицию пользователя.'),
  sex: Yup.string().required('Укажите пол.'),
  birth_date: Yup.string().required('Укажите дату рождения.'),
  nationality_id: Yup.number()
    .required('Укажите национальность.')
    .min(1, 'Укажите национальность.'),
  email: Yup.string().email('Неверный адрес электронной почты.'),
  address: Yup.object({
    physical_address: Yup.string().required('Фактический адрес обязателен.'),
    region: Yup.string().required('Укажите район.'),
  }),
  phone_numbers: Yup.object({
    code: Yup.number().required(' '),
    numbers: Yup.number().required(' '),
  }).required('Обязательное поле.'),
  whatsapp: Yup.object({
    code: Yup.number().required(' '),
    numbers: Yup.number().required(' '),
  }).required('Обязательное поле.'),
});

function UsersCreateForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const nationalities = useAppSelector(getNationalities);
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (!nationalities.data && !nationalities.isFetching) dispatch(fetchNationalitiesAction());
  }, [dispatch, nationalities.data, nationalities.isFetching]);

  const initialValues: UserStoreDTO = {
    name: '',
    surname: '',
    role: 'teacher',
    sex: 'male',
    nationality_id: 0,
    birth_date: '',
    address: {
      physical_address: '',
      region: '',
    },
    phone_numbers: {
      code: '',
      numbers: '',
    },
    whatsapp: {
      code: '',
      numbers: '',
    },
  };

  const onSubmit = async (
    values: UserStoreDTO,
    helpers: FormikHelpers<UserStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeUserAction({
      dto: values,
      onSuccess: () => {
        toast.success('Пользователь успешно добавлен.');
        helpers.resetForm();
        setKey((key) => key + 1);
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  const handleClick = (errors: FormikErrors<UserStoreDTO>) => () => {
    let fieldName = '';

    const firstKey = Object.keys(errors)[0];
    fieldName = firstKey;
    const firstErrorValue = errors[firstKey as keyof UserStoreDTO];
    if (typeof firstErrorValue === 'object') {
      const index = Object.keys(firstErrorValue)[0];
      fieldName = `${firstKey}.${index}`;
    }

    document.body.querySelector(`[name="${fieldName}"]`)?.scrollIntoView({
      block: 'center',
    });
  };

  return (
    <Formik
      key={key}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form className="flex flex-col gap-3 md:bg-white md:rounded md:shadow md:px-8 md:py-4 md:grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          <TextField name="name" label="Имя" required />
          <TextField name="surname" label="Фамилия" required />
          <TextField name="patronymic" label="Отчество (если имеется)" />

          <SelectField
            name="role"
            label="Позиция"
            options={['admin', 'director', 'teacher'].map((role) => ({ value: role, label: RoleName[role as Role] }))}
            required
          />

          <SelectField
            name="sex"
            label="Пол"
            options={['male', 'female'].map((sex) => ({ value: sex, label: SexName[sex as Sex] }))}
            required
          />

          <TextField
            name="birth_date"
            label="Дата рождения"
            type="date"
            required
          />

          {nationalities.data && (
            <SelectField
              name="nationality_id"
              label="Национальность"
              options={nationalities.data.map(({ id, name }) => ({ value: id, label: name }))}
              required
            />
          )}

          <TextField
            type="email"
            name="email"
            label="E-mail (если имеется)"
          />

          <TextField
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
            <Label label="Телефон" required />

            <div className="flex gap-1 w-full">
              <div className="relative">
                <TextField
                  className="w-[88px]"
                  inputClassname="pl-7"
                  type="number"
                  name="phone_numbers.code"
                  placeholder="Код"
                  required
                />
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xl">+</span>
              </div>
              <TextField
                className="w-[120px] grow"
                type="number"
                name="phone_numbers.numbers"
                placeholder="Номер"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <Label label="WhatsApp" required />

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
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xl">+</span>
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

          <div className="ml-auto md:col-span-2 lg:col-span-3">
            <Button
              className="justify-center md:ml-auto"
              type="submit"
              variant="success"
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={handleClick(errors)}
            >
              Зарегистрировать
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default UsersCreateForm;
