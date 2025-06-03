import Spinner from '@/components/ui/spinner';
import { useAppSelector } from '@/hooks';
import React from 'react';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import Header from '../header';
import Navigation from '../navigation';
import StudentRatingsTable from '@/components/ratings-table/student-ratings-table/student-ratings-table';

function StudentRatings(): JSX.Element {
  const user = useAppSelector(getAuthUser);

  if (!user) return <Spinner className="w-8 h-8 m-2" />;

  return (
    <main className="pt-4 pb-40">
      <Header />

      <Navigation />

      <StudentRatingsTable />
    </main>
  );
}

export default StudentRatings;
