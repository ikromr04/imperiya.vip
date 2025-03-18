import Button from '@/components/ui/button';
import SelectField from '@/components/ui/form-controls/formik/select-field';
import { UserStoreDTO } from '@/dto/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import { useFormikContext } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Step } from './users-create-form';
import { RoleName } from '@/const/users';
import { Role } from '@/types/roles';

type RoleFieldsProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<Step>>;
};

function RoleFields({
  setIsOpen,
  setStep,
}: RoleFieldsProps): JSX.Element {
  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();
  const {
    setFieldValue,
    values,
    resetForm,
    isSubmitting,
  } = useFormikContext<UserStoreDTO>();

  useEffect(() => {
    if (!grades) dispatch(fetchGradesAction());
    if (!users) dispatch(fetchUsersAction());
  }, [dispatch, grades, users]);

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="title">{RoleName[values.role as Role]}</h3>

        <Button
          className="ml-auto"
          type="reset"
          variant="error"
          icon="close"
          onClick={() => {
            setIsOpen(false);
            setStep('required');
            resetForm();
          }}
        >
          <span className="sr-only">Отмена</span>
        </Button>
      </div>

      {values.role === 'student' && grades && users ?
        <div className="flex flex-col gap-2 mb-4">
          <SelectField
            name="grade_id"
            label="Класс"
            cleanable
            onClean={() => setFieldValue('grade_id', 0)}
            options={grades.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
          />
          <SelectField
            name="mother_id"
            label="Мать"
            cleanable
            onClean={() => setFieldValue('mother_id', 0)}
            options={users.filter(({ sex, role }) => sex === 'female' && role !== 'student').map((user) => ({ value: user.id, label: user.name }))}
          />
          <SelectField
            name="father_id"
            label="Отец"
            cleanable
            onClean={() => setFieldValue('father_id', 0)}
            options={users.filter(({ sex, role }) => sex === 'male' && role !== 'student').map((user) => ({ value: user.id, label: user.name }))}
          />
        </div> : users &&
        <SelectField
          className="mb-4"
          name="children"
          label="Дети"
          multiple
          cleanable
          onClean={() => setFieldValue('children', [])}
          options={users.filter((user) => user.student).map((user) => ({ value: user.id, label: user.name }))}
        />}

      <div className="flex items-center justify-end gap-2 sm:col-span-2">
        <Button
          className="text-sm mr-auto text-blue-600 hover:text-blue-400"
          variant="text"
          type="button"
          icon="west"
          onClick={() => setStep('base')}
        >
          Назад
        </Button>

        <Button
          variant="success"
          type="submit"
          icon="add"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Добавить
        </Button>
      </div>
    </>
  );
}

export default RoleFields;
