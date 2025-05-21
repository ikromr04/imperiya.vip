import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import { getNationalities } from '@/store/nationalities-slice/nationalities-selector';
import { ReactNode } from 'react';

function Nationality(): ReactNode {
  const user = useAppSelector(getAuthUser);
  const nationalities = useAppSelector(getNationalities);

  return nationalities?.find(({ id }) => id === user?.nationalityId)?.name || '-';
}

export default Nationality;
