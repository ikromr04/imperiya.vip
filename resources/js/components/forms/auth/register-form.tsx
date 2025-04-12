import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FieldArray, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { RegisterDTO } from '@/dto/auth-dto';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { registerAction } from '@/store/auth-slice/auth-api-actions';
import Button from '@/components/ui/button';
import TextField from '@/components/ui/formik-controls/text-field';
import classNames from 'classnames';
import SelectField from '@/components/ui/formik-controls/select-field';
import { REGIONS, SexName } from '@/const/users';
import { Sex } from '@/types/users';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import ContentField from '@/components/ui/formik-controls/content-field';
import { getProfessions } from '@/store/professions-slice/professions-selector';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import { fetchProfessionsAction } from '@/store/professions-slice/professions-api-actions';
import { getNationalities } from '@/store/nationalities-slice/nationalities-selector';
import Label from '@/components/ui/formik-controls/partials/label';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  children: Yup.array().of(
    Yup.object({
      name: Yup.string().required('Имя обязательно для заполнения.'),
      surname: Yup.string().required('Фамилия обязательна для заполнения.'),
      birth_date: Yup.string().required('Укажите дату рождения.'),
      sex: Yup.string().required('Укажите пол.'),
      nationality_id: Yup.number()
        .required('Укажите национальность.')
        .min(1, 'Укажите национальность.'),
      grade_id: Yup.number()
        .required('Укажите класс.')
        .min(1, 'Укажите класс.'),
      admission_date: Yup.string()
        .required('Укажите дату поступления.')
        .min(1, 'Укажите дату поступления.'),
      previous_schools: Yup.string().required('Информация о предыдущих школах обязательна. Если нет - напишите \'Нет\'.'),
      medical_recommendations: Yup.string().required('Медицинские рекомендации обязательны. Если нет - напишите \'Нет\'.'),
    })
  ).min(1, 'Необходимо указать как минимум одного ребенка.'),

  parents: Yup.array().of(
    Yup.object({
      name: Yup.string().required('Имя обязательно для заполнения.'),
      surname: Yup.string().required('Фамилия обязательна для заполнения.'),
      birth_date: Yup.string().required('Укажите дату рождения.'),
      sex: Yup.string().required('Укажите пол.'),
      nationality_id: Yup.number()
        .required('Укажите национальность.')
        .min(1, 'Укажите национальность.'),
      profession_id: Yup.number()
        .required('Укажите сферу деятельности.')
        .min(1, 'Укажите сферу деятельности.'),
      workplace: Yup.string().required('Место работы обязательно.'),
      position: Yup.string().required('Должность обязательна.'),
      tel: Yup.object({
        code: Yup.number().required(' '),
        numbers: Yup.number().required(' '),
      }).required('Обязательное поле.'),
      whatsapp: Yup.object({
        code: Yup.number().required(' '),
        numbers: Yup.number().required(' '),
      }).required('Обязательное поле.'),
      email: Yup.string().email('Неверный формат email.').nullable().notRequired(),
      address: Yup.object({
        physical_address: Yup.string().required('Фактический адрес обязателен.'),
        region: Yup.string().required('Укажите район.'),
      }),
    })
  ).min(1, 'Необходимо указать как минимум одного родителя.'),
});

const CountName = {
  2: 'второго',
  3: 'третьего',
  4: 'четвертого',
  5: 'пятого',
  6: 'шестого',
  7: 'седьмого',
  8: 'восьмого',
  9: 'девьятого',
  10: 'десятого',
};

type RegisterFormProps = {
  token: string;
};

function RegisterForm({
  token,
}: RegisterFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const nationalities = useAppSelector(getNationalities);
  const professions = useAppSelector(getProfessions);
  const grades = useAppSelector(getGrades);
  const [key, setKey] = useState(1);
  const initialValues: RegisterDTO = {
    token,
    children: [
      {
        name: '',
        surname: '',
        birth_date: '',
        sex: '',
        nationality_id: 0,
        grade_id: 0,
        admission_date: '',
        previous_schools: '',
        medical_recommendations: '',
      },
    ],
    parents: [
      {
        name: '',
        surname: '',
        birth_date: '',
        sex: '',
        nationality_id: 0,
        profession_id: 0,
        workplace: '',
        position: '',
        tel: {
          code: '',
          numbers: '',
        },
        whatsapp: {
          code: '',
          numbers: '',
        },
        email: '',
        address: {
          physical_address: '',
          region: '',
        },
      }
    ]
  };

  useEffect(() => {
    if (!nationalities.data && !nationalities.isFetching) dispatch(fetchNationalitiesAction());
    if (!professions.data && !professions.isFetching) dispatch(fetchProfessionsAction());
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
  }, [dispatch, grades.data, grades.isFetching, nationalities.data, nationalities.isFetching, professions.data, professions.isFetching]);

  const onSubmit = async (
    values: RegisterDTO,
    helpers: FormikHelpers<RegisterDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(registerAction({
      dto: values,
      onSuccess: () => {
        toast.success('Поздравляю! Вы успешно зарегистрировались.');
        setKey((prev) => prev + 1);
      },
      onValidationError: (error) => {
        helpers.setErrors({ ...error.errors });
        if (error.errors?.token[0]) {
          toast.error(error.errors.token[0]);
        }
      },
      onFail: (message) => toast.error(message),
    }));

    helpers.setSubmitting(false);
  };

  const handleClick = (errors: FormikErrors<RegisterDTO>) => () => {
    let fieldName = '';

    const firstKey = Object.keys(errors)[0];
    if (firstKey) {
      fieldName = firstKey;

      const firstErrorValue = errors[firstKey as keyof RegisterDTO];
      if (Array.isArray(firstErrorValue)) {
        const index = firstErrorValue.findIndex((value) => value !== undefined && value !== null);

        if (index !== -1) {
          fieldName = `${firstKey}[${index}]`;

          const secondObject = firstErrorValue[index];
          if (secondObject) {
            const secondFieldName = Object.keys(secondObject)[0];
            fieldName = `${fieldName}.${secondFieldName}`;

            document.body.querySelector(`[name="${fieldName}"]`)?.scrollIntoView({
              block: 'center',
            });
          }
        }
      }
    }
  };

  return (
    <Formik
      key={key}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting, errors }) => (
        <Form className="flex flex-col gap-4 w-full max-w-5xl mx-auto">
          <section>
            <h2 className="text-xl leading-none font-semibold mb-1 ml-2">
              {values.children.length > 1 ? 'Дети' : 'Ребенок'}
            </h2>

            <FieldArray name="children">
              {({ push, remove }) => (
                <div
                  className={classNames(
                    'flex flex-col gap-3 bg-white border rounded-md shadow',
                    values.children.length > 1 ? 'px-4 py-2 ' : 'px-8 py-4',
                  )}
                >
                  {values.children.map((_, index) => (
                    <fieldset
                      key={index}
                      className={classNames(
                        'relative grid gap-3 md:grid-cols-2 lg:grid-cols-3 rounded',
                        values.children.length > 1 && 'border border-gray-300 p-4'
                      )}
                    >
                      <legend
                        className={classNames(
                          'px-1',
                          values.children.length <= 1 && 'hidden'
                        )}
                      >
                        Ребенок {index + 1}
                      </legend>

                      {values.children.length > 1 && (
                        <Button
                          className="!absolute right-1 -top-2"
                          icon="close"
                          variant="light"
                          onClick={() => remove(index)}
                        >
                          <span className="sr-only">Удалить ребенка</span>
                        </Button>
                      )}

                      <TextField name={`children[${index}].name`} label="Имя" required />
                      <TextField name={`children[${index}].surname`} label="Фамилия" required />
                      <TextField
                        className="md:col-span-2 lg:col-span-1"
                        name={`children[${index}].patronymic`}
                        label="Отчество (если имеется)"
                      />

                      <TextField
                        name={`children[${index}].birth_date`}
                        label="Дата рождения"
                        type="date"
                        required
                      />

                      <SelectField
                        name={`children[${index}].sex`}
                        label="Пол"
                        options={['male', 'female'].map((sex) => ({ value: sex, label: SexName[sex as Sex] }))}
                        required
                      />

                      {nationalities.data && (
                        <SelectField
                          name={`children[${index}].nationality_id`}
                          label="Национальность"
                          options={nationalities.data.map(({ id, name }) => ({ value: id, label: name }))}
                          required
                        />
                      )}

                      {grades.data && (
                        <SelectField
                          name={`children[${index}].grade_id`}
                          label="Класс"
                          options={grades.data.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
                          required
                        />
                      )}

                      <TextField
                        className="md:col-span-2"
                        name={`children[${index}].admission_date`}
                        label="С какого года ребенок обучается в ЧОУ «Империя знаний»"
                        type="date"
                        required
                      />

                      <ContentField
                        className="md:col-span-2 lg:col-span-3"
                        name={`children[${index}].previous_schools`}
                        label="Перечислите предыдущие школы"
                        placeholder="Если нет — пишите «Нет»"
                        required
                      />

                      <ContentField
                        className="md:col-span-2 lg:col-span-3"
                        name={`children[${index}].medical_recommendations`}
                        label="Медицинские и психологические рекомендации для ребенка"
                        placeholder="Если нет — пишите «Нет»"
                        required
                      />
                    </fieldset>
                  ))}

                  <Button
                    className="justify-center leading-none !w-full shadow-none border !bg-gray-50 border-dashed border-gray-300 mt-1 text-gray-500 hover:border-gray-500"
                    icon="add"
                    variant="light"
                    onClick={() => push(initialValues.children[0])}
                  >
                    Добавить {CountName[(values.children.length + 1) as keyof typeof CountName]} ребенка
                  </Button>
                </div>
              )}
            </FieldArray>
          </section>

          <section>
            <h2 className="text-xl leading-none font-semibold mb-1 ml-2">
              {values.parents.length > 1 ? 'Родители' : 'Родитель'}
            </h2>

            <FieldArray name="parents">
              {({ push, remove }) => (
                <div
                  className={classNames(
                    'flex flex-col gap-3 bg-white border rounded-md shadow',
                    values.parents.length > 1 ? 'px-4 py-2 ' : 'px-8 py-4 ',
                  )}
                >
                  {values.parents.map((_, index) => (
                    <fieldset
                      key={index}
                      className={classNames(
                        'relative grid gap-3 md:grid-cols-2 lg:grid-cols-3 rounded',
                        values.parents.length > 1 && 'border border-gray-300 p-4'
                      )}
                    >
                      <legend
                        className={classNames(
                          'px-1',
                          values.parents.length <= 1 && 'hidden'
                        )}
                      >
                        Родитель {index + 1}
                      </legend>

                      {values.parents.length > 1 && (
                        <Button
                          className="!absolute right-1 -top-2"
                          icon="close"
                          variant="light"
                          onClick={() => remove(index)}
                        >
                          <span className="sr-only">Удалить родителя</span>
                        </Button>
                      )}

                      <TextField name={`parents[${index}].name`} label="Имя" required />
                      <TextField name={`parents[${index}].surname`} label="Фамилия" required />
                      <TextField
                        className="md:col-span-2 lg:col-span-1"
                        name={`parents[${index}].patronymic`}
                        label="Отчество (если имеется)"
                      />

                      <TextField
                        name={`parents[${index}].birth_date`}
                        label="Дата рождения"
                        type="date"
                        required
                      />

                      <SelectField
                        name={`parents[${index}].sex`}
                        label="Пол"
                        options={['male', 'female'].map((sex) => ({ value: sex, label: SexName[sex as Sex] }))}
                        required
                      />

                      {nationalities.data && (
                        <SelectField
                          name={`parents[${index}].nationality_id`}
                          label="Национальность"
                          options={nationalities.data.map(({ id, name }) => ({ value: id, label: name }))}
                          required
                        />
                      )}
                      {professions.data && (
                        <SelectField
                          name={`parents[${index}].profession_id`}
                          label="Сфера деятельности"
                          options={professions.data.map(({ id, name }) => ({ value: id, label: name }))}
                          required
                        />
                      )}
                      <TextField
                        name={`parents[${index}].workplace`}
                        label="Место работы"
                        required
                      />
                      <TextField
                        name={`parents[${index}].position`}
                        label="Должность"
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
                              name={`parents[${index}].tel.code`}
                              placeholder="Код"
                              required
                            />
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xl">+</span>
                          </div>
                          <TextField
                            className="w-[120px] grow"
                            type="number"
                            name={`parents[${index}].tel.numbers`}
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
                              name={`parents[${index}].whatsapp.code`}
                              placeholder="Код"
                              required
                            />
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xl">+</span>
                          </div>
                          <TextField
                            className="w-[120px] grow"
                            type="number"
                            name={`parents[${index}].whatsapp.numbers`}
                            placeholder="Номер"
                            required
                          />
                        </div>
                      </div>

                      <TextField
                        className="md:order-1 lg:order-none"
                        type="email"
                        name={`parents[${index}].email`}
                        label="E-mail (если имеется)"
                      />

                      <TextField
                        className="lg:col-span-2"
                        name={`parents[${index}].address.physical_address`}
                        label="Адрес проживания (фактический)"
                        required
                      />
                      <SelectField
                        name={`parents[${index}].address.region`}
                        label="Район"
                        options={REGIONS.map((region) => ({ value: region, label: region }))}
                        required
                      />
                    </fieldset>
                  ))}

                  {values.parents.length === 1 && (
                    <Button
                      className="justify-center leading-none !w-full shadow-none border !bg-gray-50 border-dashed border-gray-300 mt-1 text-gray-500 hover:border-gray-500"
                      icon="add"
                      variant="light"
                      onClick={() => push(initialValues.parents[0])}
                    >
                      Добавить второго родителя
                    </Button>
                  )
                  }
                </div>
              )}
            </FieldArray>
          </section>

          <Button
            className="justify-center"
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            onClick={handleClick(errors)}
          >
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
