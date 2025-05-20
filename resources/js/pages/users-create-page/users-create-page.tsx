import UsersCreateForm from '@/components/forms/users/users-create-form/users-create-form';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { AppRoute } from '@/const/routes';
import React from 'react';

function UsersCreatePage(): JSX.Element {
  return (
    <main className="pt-4 pb-40">
      <Breadcrumbs
        items={[
          ['Справочник пользователей', AppRoute.Users.Index],
          ['Добавить', ''],
        ]}
      />

      <h1 className="title mb-1">
        Регистрация нового пользователя
      </h1>

      <UsersCreateForm />
    </main>
  );
}

export default UsersCreatePage;
