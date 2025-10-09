import DescriptionList from '@/components/ui/description-list';
import { RoleName } from '@/const/users';
import { User } from '@/types/users';
import React from 'react';

type DirectorInfoProps = {
  user: User;
};

function DirectorInfo({
  user,
}: DirectorInfoProps): JSX.Element {
  return (
    <section className="box">
      <header className="box__header">
        <h2 className="title md:!text-lg">{RoleName[user.role]}</h2>
      </header>

      <div className="relative">
        <DescriptionList
          className="box__body"
          list={{}}
        />
        <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
}

export default DirectorInfo;
