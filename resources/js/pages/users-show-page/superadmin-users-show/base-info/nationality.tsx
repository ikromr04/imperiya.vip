import { useAppSelector } from '@/hooks';
import { getNationalities } from '@/store/nationalities-slice/nationalities-selector';
import { User } from '@/types/users';
import { ReactNode } from 'react';

type NationalityProps = {
  user: User;
}

function Nationality({
  user,
}: NationalityProps): ReactNode {
  const nationalities = useAppSelector(getNationalities);

  return nationalities?.find(({ id }) => id === user?.nationalityId)?.name || '-';
}

export default Nationality;
