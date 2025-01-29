import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import BirthdateField from './birthdate-field';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUsersFilter } from '@/store/app-slice/app-selector';
import { getGenders } from '@/store/genders-slice/genders-selector';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { getNationalities } from '@/store/nationality-slice/grades-selector';
import { fetchGendersAction } from '@/store/genders-slice/genders-api-actions';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { fetchNationalitiesAction } from '@/store/nationality-slice/nationality-api-actions';
import { UsersFilter } from '@/types/users';
import { resetUsersFilterAction, setUsersFilterAction } from '@/store/app-slice/app-slice';
import TextField from '@/components/ui/fields/text-field';
import SelectField from '@/components/ui/fields/select-field';
import { Role } from '@/const';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';

type UsersFilterFormProps = {
  className?: string;
};

function UsersFilterForm({
  className,
}: UsersFilterFormProps): JSX.Element {
  const usersFilter = useAppSelector(getUsersFilter);
  const dispatch = useAppDispatch();
  const genders = useAppSelector(getGenders);
  const grades = useAppSelector(getGrades);
  const nationalities = useAppSelector(getNationalities);

  useEffect(() => {
    if (!genders) dispatch(fetchGendersAction());
    if (!grades) dispatch(fetchGradesAction());
    if (!nationalities) dispatch(fetchNationalitiesAction());
  }, [dispatch, genders, grades, nationalities]);

  const onSubmit = async (values: UsersFilter) => {
    dispatch(setUsersFilterAction(values));
  };

  return (
    <Formik
      initialValues={usersFilter}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form className={classNames(className, 'flex flex-col gap-2')}>
          <div className="flex flex-col grow overflow-y-auto scrollbar-y gap-1">
            <TextField
              name="name.query"
              label="ФИО"
              cleanable
              onClean={() => {
                setFieldValue('name.query', '');
                handleSubmit();
              }}
              onInput={() => handleSubmit()}
              after={
                <button
                  className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                  type="button"
                  onClick={() => {
                    setFieldValue('name.visibility', !values.name.visibility);
                    handleSubmit();
                  }}
                >
                  {values.name.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
                </button>
              }
            />

            {genders &&
              <SelectField
                name="gender.query"
                label="Пол"
                cleanable
                onClean={() => {
                  setFieldValue('gender.query', 0);
                  handleSubmit();
                }}
                onChange={() => handleSubmit()}
                after={
                  <button
                    className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                    type="button"
                    onClick={() => {
                      setFieldValue('gender.visibility', !values.gender.visibility);
                      handleSubmit();
                    }}
                  >
                    {values.gender.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
                  </button>
                }
                options={genders.map((gender) => ({ value: gender.id, label: gender.name }))}
              />}

            <SelectField
              name="roles.query"
              label="Позиции"
              multiple
              cleanable
              onClean={() => {
                setFieldValue('roles.query', []);
                handleSubmit();
              }}
              onChange={() => handleSubmit()}
              after={
                <button
                  className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                  type="button"
                  onClick={() => {
                    setFieldValue('roles.visibility', !values.roles.visibility);
                    handleSubmit();
                  }}
                >
                  {values.roles.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
                </button>
              }
              options={Object.entries(Role).map((values) => ({ value: values[0], label: values[1] }))}
            />

            {grades &&
              <SelectField
                name="grades.query"
                label="Классы"
                multiple
                cleanable
                searchable
                onClean={() => {
                  setFieldValue('grades.query', []);
                  handleSubmit();
                }}
                onChange={() => handleSubmit()}
                after={
                  <button
                    className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                    type="button"
                    onClick={() => {
                      setFieldValue('grades.visibility', !values.grades.visibility);
                      handleSubmit();
                    }}
                  >
                    {values.grades.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
                  </button>
                }
                options={grades.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
              />}

            <TextField
              name="phoneNumber.query"
              label="Телефон"
              cleanable
              onClean={() => {
                setFieldValue('phoneNumber.query', '');
                handleSubmit();
              }}
              onInput={() => handleSubmit()}
              after={
                <button
                  className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                  type="button"
                  onClick={() => {
                    setFieldValue('phoneNumber.visibility', !values.phoneNumber.visibility);
                    handleSubmit();
                  }}
                >
                  {values.phoneNumber.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
                </button>
              }
            />

            <TextField
              name="email.query"
              label="Электронная почта"
              cleanable
              onClean={() => {
                setFieldValue('email.query', '');
                handleSubmit();
              }}
              onInput={() => handleSubmit()}
              after={
                <button
                  className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                  type="button"
                  onClick={() => {
                    setFieldValue('email.visibility', !values.email.visibility);
                    handleSubmit();
                  }}
                >
                  {values.email.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
                </button>
              }
            />

            <TextField
              name="login.query"
              label="Логин"
              cleanable
              onClean={() => {
                setFieldValue('login.query', '');
                handleSubmit();
              }}
              onInput={() => handleSubmit()}
              after={
                <button
                  className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                  type="button"
                  onClick={() => {
                    setFieldValue('login.visibility', !values.login.visibility);
                    handleSubmit();
                  }}
                >
                  {values.login.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
                </button>
              }
            />

            <BirthdateField
              handleSubmit={() => handleSubmit()}
              onClean={() => {
                setFieldValue('birthDate.day', '');
                setFieldValue('birthDate.month', '');
                setFieldValue('birthDate.year', '');
                handleSubmit();
              }}
            />

            <TextField
              name="address.query"
              label="Адрес"
              cleanable
              onClean={() => {
                setFieldValue('address.query', '');
                handleSubmit();
              }}
              onInput={() => handleSubmit()}
              after={
                <button
                  className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                  type="button"
                  onClick={() => {
                    setFieldValue('address.visibility', !values.address.visibility);
                    handleSubmit();
                  }}
                >
                  {values.address.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
                </button>
              }
            />

            {nationalities &&
              <SelectField
                name="nationalities.query"
                label="Национальность"
                multiple
                cleanable
                onClean={() => {
                  setFieldValue('nationalities.query', []);
                  handleSubmit();
                }}
                onChange={() => handleSubmit()}
                after={
                  <button
                    className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                    type="button"
                    onClick={() => {
                      setFieldValue('nationalities.visibility', !values.nationalities.visibility);
                      handleSubmit();
                    }}
                  >
                    {values.nationalities.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
                  </button>
                }
                options={nationalities.map((nationality) => ({ value: nationality.id, label: nationality.name }))}
              />}
          </div>

          <Button
            className="justify-center min-h-8"
            onClick={() => dispatch(resetUsersFilterAction())}
            type="reset"
          >
            Сбросить
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default UsersFilterForm;
