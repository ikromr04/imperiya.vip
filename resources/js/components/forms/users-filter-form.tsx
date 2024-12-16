import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { UsersFilter } from '../../types/users';
import classNames from 'classnames';
import { PropsWithClassname } from '../../types';
import TextField from '../ui/fields/text-field';
import { Icons } from '../icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUsersFilter } from '../../store/app-slice/app-selector';
import { setUsersFilterAction } from '../../store/app-slice/app-slice';
import SelectField from '../ui/fields/select-field';
import { getGenders } from '../../store/genders-slice/genders-selector';
import { fetchGendersAction } from '../../store/genders-slice/genders-api-actions';
import { getRoles } from '../../store/roles-slice/roles-selector';
import { fetchRolesAction } from '../../store/roles-slice/roles-api-actions';
import { getGrades } from '../../store/grades-slice/grades-selector';
import { fetchGradesAction } from '../../store/grades-slice/grades-api-actions';

type UsersFilterFormProps = PropsWithClassname;

export default function UsersFilterForm({
  className,
}: UsersFilterFormProps): JSX.Element {
  const usersFilter = useAppSelector(getUsersFilter);
  const dispatch = useAppDispatch();
  const genders = useAppSelector(getGenders);
  const roles = useAppSelector(getRoles);
  const grades = useAppSelector(getGrades);

  useEffect(() => {
    if (!genders) dispatch(fetchGendersAction());
    if (!roles) dispatch(fetchRolesAction());
    if (!grades) dispatch(fetchGradesAction());
  }, [dispatch, genders, roles, grades]);

  const onSubmit = async (values: UsersFilter) => {
    dispatch(setUsersFilterAction(values));
  };

  return (
    <Formik
      initialValues={usersFilter}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form className={classNames(className, 'flex flex-col gap-1')}>
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

          {roles &&
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
              options={roles.map((role) => ({ value: role.id, label: role.name }))}
            />}

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
            name="phone.query"
            label="Телефон"
            cleanable
            onClean={() => {
              setFieldValue('phone.query', '');
              handleSubmit();
            }}
            onInput={() => handleSubmit()}
            after={
              <button
                className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300 border-l"
                type="button"
                onClick={() => {
                  setFieldValue('phone.visibility', !values.phone.visibility);
                  handleSubmit();
                }}
              >
                {values.phone.visibility ? <Icons.visibility width={20} /> : <Icons.visibilityOff width={20} />}
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
        </Form>
      )}
    </Formik>
  );
}
