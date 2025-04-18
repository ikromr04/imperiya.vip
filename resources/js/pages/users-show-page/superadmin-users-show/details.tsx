import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import DescriptionList from '@/components/ui/description-list';
import { User } from '@/types/users';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';

type DetailsProps = {
  user: User;
};

function Details({
  user,
}: DetailsProps): JSX.Element {
  return (
    <section className="box">
      <div className="box__header flex-col !items-start">
        <Button
          className="flex items-center gap-2 text-blue-600 leading-none"
          variant="default"
          href={user.email ? `mailto:${user.email}` : ''}
        >
          <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-success">
            <Icons.mail width={16} height={16} />
          </span>
          {user.email ?? '-'}
        </Button>

        <Button
          className={classNames(
            'flex items-center gap-2 text-blue-600 leading-none',
            !user.whatsapp && 'pointer-events-none',
          )}
          variant="default"
          href={`https://wa.me/+${user.whatsapp?.code}${user.whatsapp?.numbers}`}
          target="_blank"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-success">
            <Icons.whatsapp width={16} height={16} />
          </span>
          {user.whatsapp ? `+${user.whatsapp.code} ${user.whatsapp.numbers}` : '-'}
        </Button>
      </div>

      <DescriptionList
        className="box__body"
        variant="detailed"
        list={{
          'Дата регистрации': dayjs(user.createdAt).format('DD MMMM YYYY'),
        }}
      />
    </section>
  );
}

export default Details;
