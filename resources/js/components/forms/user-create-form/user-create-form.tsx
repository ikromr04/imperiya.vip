import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import TextField from '../../ui/fields/text-field';
import Button from '../../ui/button';
import classNames from 'classnames';
import { UserStoreDTO } from '../../../dto/users';
import SelectField from '../../ui/fields/select-field';
import { getRoles } from '../../../store/roles-slice/roles-selector';
import { fetchRolesAction } from '../../../store/roles-slice/roles-api-actions';
import { getGenders } from '../../../store/genders-slice/genders-selector';
import { fetchGendersAction } from '../../../store/genders-slice/genders-api-actions';
import { getGrades } from '../../../store/grades-slice/grades-selector';
import { fetchGradesAction } from '../../../store/grades-slice/grades-api-actions';
import { getNationalities } from '../../../store/nationality-slice/grades-selector';
import { fetchNationalitiesAction } from '../../../store/nationality-slice/nationality-api-actions';
import * as Yup from 'yup';
import { storeUserAction } from '../../../store/users-slice/users-api-actions';
import Message, { MessageProps } from '../../ui/message';
import { Nationality } from '../../../types/nationalities';
import StepFirst from './steps/step-first';
import StepSecond from './steps/step-second';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Введите ФИО пользователя.'),
  login: Yup.string().required('Введите уникальный логин пользователя.'),
  role_type: Yup.number()
    .notOneOf([0], 'Выберите позицию.')
    .required('Выберите позицию.'),
  email: Yup.string().email('Неверный адрес электронной почты.'),
});

type UserCreateFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function UserCreateForm({
  setIsOpen,
}: UserCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<1 | 2>(1);
  const initialValues: UserStoreDTO = {
    name: '',
    login: '',
    role_type: 0,
    email: '',
    birth_date: '',
    address: '',
    facebook: '',
    instagram: '',
    telegram: '',
    odnoklassniki: '',
    gender_id: 0,
    grade_id: 0,
    nationality_id: 0,
  };

  const Step = {
    1: <StepFirst />,
    2: <StepSecond />
  };

  const roles = useAppSelector(getRoles);
  const genders = useAppSelector(getGenders);
  const grades = useAppSelector(getGrades);
  const nationalities = useAppSelector(getNationalities);
  const [message, setMessage] = useState<MessageProps['message']>(undefined);

  const onSubmit = async (
    values: UserStoreDTO,
    helpers: FormikHelpers<UserStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeUserAction({
      dto: values,
      onSuccess: () => {
        helpers.resetForm();
        setMessage(['Новый пользователь успешно добавлен.', 'success']);
        setTimeout(() => setMessage(undefined), 5000);
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => {
        setMessage([message, 'error']);
        setTimeout(() => setMessage(undefined), 5000);
      },
    }));

    helpers.setSubmitting(false);
  };

  useEffect(() => {
    if (!roles) dispatch(fetchRolesAction());
    if (!genders) dispatch(fetchGendersAction());
    if (!grades) dispatch(fetchGradesAction());
    if (!nationalities) dispatch(fetchNationalitiesAction());
  }, [dispatch, roles, genders, grades, nationalities]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="grid gap-y-2 gap-x-4 sm:grid-cols-2">
          <Message className="mb-4 sm:col-span-2" message={message} />

          {Step[step]}

          <TextField name="email" label="Электронная почта" type="email" />

          <TextField name="birth_date" label="Дата рождения" type="date" />

          {genders &&
            <SelectField
              name="gender_id"
              label="Пол"
              cleanable
              onClean={() => setFieldValue('gender', 0)}
              options={genders.map((gender) => ({ value: gender.id, label: gender.name }))}
            />}

          {grades &&
            <SelectField
              name="grade_id"
              label="Класс"
              cleanable
              onClean={() => setFieldValue('grade', 0)}
              options={grades.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
            />}

          {nationalities &&
            <SelectField
              name="nationality_id"
              label="Национальность"
              cleanable
              onClean={() => setFieldValue('nationality', 0)}
              options={nationalities.map((nationality: Nationality) => ({ value: nationality.id, label: nationality.name }))}
            />}

          {/* <TextField className="sm:col-span-2" name="address" label="Адрес" /> */}

          {/* <TextField name="facebook" label="Фейсбук" /> */}

          {/* <TextField name="instagram" label="Инстаграм" /> */}

          {/* <TextField name="telegram" label="Телеграм" /> */}

          {/* <TextField name="odnoklassniki" label="Одноклассники" /> */}

          <div className="flex items-center justify-end gap-2 mt-2 sm:col-span-2">
            <Button
              type="reset"
              onClick={() => {
                setIsOpen(false);
                setMessage(undefined);
              }}
              variant="error"
            >
              Отмена
            </Button>
            <Button
              className={classNames('justify-center min-w-[92px]', isSubmitting && 'opacity-60')}
              type="submit"
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
