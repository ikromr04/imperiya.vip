import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Spinner from '@/components/ui/spinner';
import { getRatingDates, getRatingDatesStatus } from '@/store/ratings-slice/ratings-selector';
import { fetchRatingDatesAction } from '@/store/ratings-slice/ratings-api-actions';
import RatingDatesEditForm from '@/components/forms/ratings/rating-dates-edit-form';
import { AsyncStatus } from '@/const/store';
import { getEducationYearRange } from '@/utils';

function RatingDatesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const ratingDatesStatus = useAppSelector(getRatingDatesStatus);
  const ratingDates = useAppSelector(getRatingDates);
  const ratingDate = ratingDates?.find(({years}) => years === getEducationYearRange());

  useEffect(() => {
    if (ratingDatesStatus === AsyncStatus.Idle) dispatch(fetchRatingDatesAction());
  }, [dispatch, ratingDatesStatus]);

  return (
    <main className="py-2">
      <h1 className="title mb-1 px-3">
        Даты рейтингов
      </h1>

      {ratingDate ? (
        <RatingDatesEditForm ratingDate={ratingDate} />
      ) : (
        <Spinner className="w-8 h-8" />
      )}
    </main>
  );
}

export default RatingDatesPage;
