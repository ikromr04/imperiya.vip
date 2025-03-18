import SelectField from '@/components/ui/form-controls/formik/select-field';
import { RoleUpdateDTO } from '@/dto/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { getUsers } from '@/store/users-slice/users-selector';
import { User } from '@/types/users';
import { FormikHelpers } from 'formik';
import React, { useEffect } from 'react';

type RoleFieldsProps = {
  user: User;
  setFieldValue: FormikHelpers<RoleUpdateDTO>['setFieldValue'];
};

function RoleFields({
  user,
  setFieldValue,
}: RoleFieldsProps): JSX.Element {
  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!grades) dispatch(fetchGradesAction());
  }, [dispatch, grades]);

  switch (user.role) {
    case 'superadmin':
      return (
        <>

        </>
      );

    case 'admin':
      return (
        <>

        </>
      );

    case 'director':
      return (
        <>

        </>
      );

    case 'teacher':
      return (
        <>

        </>
      );

    case 'parent':
      return (
        <>
          {users &&
            <SelectField
              name="children"
              label="Дети"
              multiple
              cleanable
              onClean={() => setFieldValue('children', [])}
              options={users.filter((user) => user.student).map((user) => ({ value: user.id, label: user.name }))}
            />}
        </>
      );

    case 'student':
      return (
        <>
          {grades &&
            <SelectField
              name="grade_id"
              label="Класс"
              cleanable
              onClean={() => setFieldValue('grade_id', 0)}
              options={grades.map((grade) => ({ value: grade.id, label: `${grade.level} ${grade.group}` }))}
            />}
          {users &&
            <SelectField
              name="mother_id"
              label="Мать"
              cleanable
              onClean={() => setFieldValue('mother_id', 0)}
              options={users.filter((user) => !user.student).map((user) => ({ value: user.id, label: user.name }))}
            />}
          {users &&
            <SelectField
              name="father_id"
              label="Отец"
              cleanable
              onClean={() => setFieldValue('father_id', 0)}
              options={users.filter((user) => !user.student).map((user) => ({ value: user.id, label: user.name }))}
            />}
        </>
      );

    default:
      return <></>;
  }
}

export default RoleFields;
