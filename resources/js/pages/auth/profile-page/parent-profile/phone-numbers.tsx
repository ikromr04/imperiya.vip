import { Icons } from '@/components/icons';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import React, { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

function PhoneNumbers(): ReactNode {
  const user = useAppSelector(getAuthUser);

  if (!user) return;

  return (
    <section className="box">
      <header className="box__header">
        <h2 className="font-medium text-gray-900">Телефонные номера</h2>
      </header>

      <ul className="box__body flex flex-col gap-2">
        {user.phoneNumbers?.map(({ code, numbers }) => (
          <li key={numbers}>
            <Link className="flex items-center gap-2 w-max text-blue-600" to={`tel:+${code}${numbers}`}>
              <span className="flex items-center w-7 h-7 justify-center bg-blue-50 rounded text-success">
                <Icons.phone width={16} height={16} />
              </span>
              +{code} {numbers}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(PhoneNumbers);
