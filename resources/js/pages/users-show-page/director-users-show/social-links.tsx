import { Icons } from '@/components/icons';
import { User } from '@/types/users';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

type SocialLinksProps = {
  user: User;
}

function SocialLinks({
  user,
}: SocialLinksProps): JSX.Element {
  return (
    <section className="box">
      <header className="box__header">
        <h2 className="font-medium text-gray-900">Социальные сети</h2>
      </header>

      <div className="box__body flex flex-wrap gap-2">
        {user.socialLink?.facebook &&
          <Link className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none" to={user.socialLink.facebook} target="_blank">
            <Icons.facebook width={24} height={24} />
          </Link>}
        {user.socialLink?.instagram &&
          <Link className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none" to={user.socialLink?.instagram} target="_blank">
            <Icons.instagram width={24} height={24} />
          </Link>}
        {user.socialLink?.telegram &&
          <Link className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none" to={user.socialLink?.telegram} target="_blank">
            <Icons.telegram width={24} height={24} />
          </Link>}
        {user.socialLink?.odnoklassniki &&
          <Link className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none" to={user.socialLink?.odnoklassniki} target="_blank">
            <Icons.odnoklassniki width={24} height={24} />
          </Link>}
      </div>
    </section>
  );
}

export default memo(SocialLinks);
