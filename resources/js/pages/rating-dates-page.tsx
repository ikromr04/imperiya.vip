import React, { useEffect } from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Spinner from '@/components/ui/spinner';
import { getRatingDates } from '@/store/ratings-slice/ratings-selector';
import { fetchRatingDatesAction } from '@/store/ratings-slice/ratings-api-actions';
import RatingDatesEditForm from '@/components/forms/ratings/rating-dates-edit-form';

function RatingDatesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const ratingDates = useAppSelector(getRatingDates);

  useEffect(() => {
    if (!ratingDates.data && !ratingDates.isFetching) dispatch(fetchRatingDatesAction());
  }, [dispatch, ratingDates.data, ratingDates.isFetching]);

  return (
    <AppLayout>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Даты рейтингов
        </h1>

        {ratingDates.data ? (
          <RatingDatesEditForm ratingDate={ratingDates.data[0]} />
        ) : (
          <Spinner className="w-8 h-8" />
        )}
      </main>
    </AppLayout >
  );
}

export default RatingDatesPage;
