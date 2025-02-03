import SelectField from '@/components/ui/fields/select-field';
import TextField from '@/components/ui/fields/text-field';
import { useAppSelector } from '@/hooks';
import { getRoles } from '@/store/roles-slice/roles-selector';
import { useFormikContext } from 'formik';
import React from 'react';

function StepFirst(): JSX.Element {
  const roles = useAppSelector(getRoles);
  const form = useFormikContext();

  return (
    <>
      <TextField name="name" label="ФИО" required />

      <TextField name="login" label="Логин" required />

      {roles &&
        <SelectField
          name="role_type"
          label="Позиция"
          cleanable
          required
          onClean={() => form.setFieldValue('role', 0)}
          options={roles.map((role) => ({ value: role.id, label: role.name }))}
        />}
    </>
  );
}

export default StepFirst;
