import Button from '@/components/ui/button';
import ContentField from '@/components/ui/formik-controls/content-field';
import Label from '@/components/ui/formik-controls/partials/label';
import SelectField from '@/components/ui/formik-controls/select-field';
import TextField from '@/components/ui/formik-controls/text-field';
import { AsyncStatus } from '@/const/store';
import { REGIONS, RoleName, ROLES, SexName } from '@/const/users';
import { UserStoreDTO } from '@/dto/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import { getNationalities, getNationalitiesStatus } from '@/store/nationalities-slice/nationalities-selector';
import { fetchProfessionsAction } from '@/store/professions-slice/professions-api-actions';
import { getProfessions, getProfessionsStatus } from '@/store/professions-slice/professions-selector';
import { fetchUsersAction, storeUserAction } from '@/store/users-slice/users-api-actions';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { Option, Options } from '@/types';
import { Role, Sex } from '@/types/users';
import { Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно для заполнения.'),
  surname: Yup.string().required('Фамилия обязательна для заполнения.'),
  patronymic: Yup.string(),

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
  }).required('Укажите адрес.'),

  teacher: Yup.object({
    grades: Yup.array().of(
      Yup.number()
        .typeError('ID класса должен быть числом.')
        .integer('ID класса должен быть целым числом.')
        .min(1, 'ID класса должен быть больше нуля.')
    ),
  }),

  parent: Yup.object({
    children: Yup.array().of(
      Yup.number()
        .typeError('ID ребенка должен быть числом.')
        .integer('ID ребенка должен быть целым числом.')
        .min(1, 'ID ребенка должен быть больше нуля.')
    ),
    profession_id: Yup.number()
      .required('Укажите профессию.')
      .min(1, 'Укажите профессию.'),
    workplace: Yup.string().required('Укажите место работы.'),
    position: Yup.string().required('Укажите должность.'),
  })
    .nullable()
    .notRequired()
    .default(undefined)
    .transform((value, originalValue) => (originalValue === undefined ? undefined : value)),

  student: Yup.object({
    grade_id: Yup.number().required('Укажите класс.'),
    mother_id: Yup.number(),
    father_id: Yup.number(),
    admission_date: Yup.string().required('Укажите дату поступления.'),
    previous_schools: Yup.string().required('Предыдущие школы обязательны.'),
    medical_recommendations: Yup.string().required('Медицинские рекомендации обязательны.'),
  })
    .nullable()
    .notRequired()
    .default(undefined)
    .transform((value, originalValue) => originalValue === undefined ? undefined : value),
});

function UsersCreateForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const nationalitiesStatus = useAppSelector(getNationalitiesStatus);
  const gradesStatus = useAppSelector(getGradesStatus);
  const usersStatus = useAppSelector(getUsersStatus);
  const professionsStatus = useAppSelector(getProfessionsStatus);

  const nationalities = useAppSelector(getNationalities);
  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const professions = useAppSelector(getProfessions);

  const [key, setKey] = useState(1);

  useEffect(() => {
    if (nationalitiesStatus === AsyncStatus.Idle) dispatch(fetchNationalitiesAction());
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
    if (professionsStatus === AsyncStatus.Idle) dispatch(fetchProfessionsAction());
  }, [dispatch, gradesStatus, nationalitiesStatus, professionsStatus, usersStatus]);

  const initialValues: UserStoreDTO = {
    name: '',
    surname: '',
    role: '',
    sex: '',
    nationality_id: 0,
    birth_date: '',
    address: {
      physical_address: '',
      region: '',
    },
    phone_numbers: [{
      code: '',
      numbers: '',
    }],
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

    if (!values.whatsapp?.code || !values.whatsapp?.numbers) {
      delete values.whatsapp;
    }

    if (!values.phone_numbers?.[0].code || !values.phone_numbers?.[0].numbers) {
      delete values.phone_numbers;
    }

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

  const handleRoleChange = (setValue: (field: string, value: unknown, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<UserStoreDTO>>) =>
    (role: Option | Options) => {
      switch ((role as Option).value) {
        case 'teacher':
          setValue('teacher', {});
          setValue('parent', undefined);
          setValue('student', undefined);
          break;

        case 'parent':
          setValue('teacher', undefined);
          setValue('parent', {
            profession_id: 0,
            workplace: '',
            position: '',
          });
          setValue('student', undefined);
          break;

        case 'student':
          setValue('teacher', undefined);
          setValue('parent', undefined);
          setValue('student', {
            grade_id: 0,
            admission_date: '',
            previous_schools: '',
            medical_recommendations: '',
          });
          break;

        default:
          setValue('teacher', undefined);
          setValue('parent', undefined);
          setValue('student', undefined);
          break;
      }
    };

  return (
    <Formik
      key={key}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, values, setFieldValue }) => (
        <Form className="flex flex-col gap-3 md:bg-white md:rounded md:shadow md:px-8 md:py-4 md:grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          <TextField name="name" label="Имя" required />
          <TextField name="surname" label="Фамилия" required />
          <TextField name="patronymic" label="Отчество" />

          <SelectField
            name="role"
            label="Позиция"
            onChange={handleRoleChange(setFieldValue)}
            options={ROLES.map((role) => ({ value: role, label: RoleName[role as Role] }))}
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

          {nationalities && (
            <SelectField
              name="nationality_id"
              label="Национальность"
              options={nationalities.map(({ id, name }) => ({ value: id, label: name }))}
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
            <Label label="Телефон" />

            <div className="flex gap-1 w-full">
              <div className="relative">
                <TextField
                  className="w-[88px]"
                  inputClassname="pl-7"
                  type="number"
                  name="phone_numbers[0].code"
                  placeholder="Код"
                />
                <span className="absolute top-4 left-3 -translate-y-1/2 text-xl">+</span>
              </div>
              <TextField
                className="w-[120px] grow"
                type="number"
                name="phone_numbers[0].numbers"
                placeholder="Номер"
              />
            </div>
          </div>

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
                />
                <span className="absolute top-4 left-3 -translate-y-1/2 text-xl">+</span>
              </div>
              <TextField
                className="w-[120px] grow"
                type="number"
                name="whatsapp.numbers"
                placeholder="Номер"
              />
            </div>
          </div>

          {values.role === 'teacher' && grades && (
            <SelectField
              name="teacher.grades"
              label="Назначить руководителем класса"
              multiple
              options={grades.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
            />
          )}

          {values.role === 'parent' && users && professions && (
            <>
              <SelectField
                name="parent.children"
                label="Дети"
                multiple
                searchable
                options={users.filter(({ role }) => role === 'student').map((user) => ({ value: user.id, label: `${user.surname} ${user.name} ${user.patronymic ?? ''}` }))}
              />

              <SelectField
                name="parent.profession_id"
                label="Сфера деятельности"
                options={professions.map((profession) => ({ value: profession.id, label: profession.name }))}
                required
              />

              <TextField
                name="parent.workplace"
                label="Место работы"
                required
              />

              <TextField
                name="parent.position"
                label="Должность"
                required
              />
            </>
          )}

          {values.role === 'student' && users && grades && (
            <>
              <SelectField
                name="student.grade_id"
                label="Класс"
                options={grades.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
                required
              />

              <SelectField
                name="student.mother_id"
                label="Мать"
                searchable
                options={users.filter((user) => user.role === 'parent' && user.sex === 'female').map((user) => ({ value: user.id, label: `${user.surname} ${user.name} ${user.patronymic ?? ''}` }))}
              />

              <SelectField
                name="student.father_id"
                label="Отец"
                searchable
                options={users.filter((user) => user.role === 'parent' && user.sex === 'male').map((user) => ({ value: user.id, label: `${user.surname} ${user.name} ${user.patronymic ?? ''}` }))}
              />

              <TextField
                className="lg:col-span-2"
                name="student.admission_date"
                label="С какого года ребенок обучается в ЧОУ «Империя знаний»"
                type="date"
                required
              />

              <ContentField
                className="md:col-span-2 lg:col-span-3"
                name="student.previous_schools"
                label="Перечислите предыдущие школы"
                placeholder="Если нет — пишите «Нет»"
                required
              />

              <ContentField
                className="md:col-span-2 lg:col-span-3"
                name="student.medical_recommendations"
                label="Медицинские и психологические рекомендации для ребенка"
                placeholder="Если нет — пишите «Нет»"
                required
              />
            </>
          )}

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
