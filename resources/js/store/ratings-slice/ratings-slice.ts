import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '@/const/store';
import { RatingDates } from '@/types/ratings';
import { fetchRatingDatesAction, fetchRatingsAction } from './ratings-api-actions';

export type RatingsSlice = {
  lessons: {
    isFetching: boolean;
  };
  dates: {
    data: RatingDates | null;
    isFetching: boolean;
  };
}

const initialState: RatingsSlice = {
  lessons: {
    isFetching: false,
  },
  dates: {
    data: null,
    isFetching: false,
  },
};

export const ratingsSlice = createSlice({
  name: SliceName.Ratings,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRatingsAction.pending, (state) => {
        state.lessons.isFetching = true;
      })
      .addCase(fetchRatingsAction.fulfilled, (state) => {
        state.lessons.isFetching = false;
      })
      .addCase(fetchRatingsAction.rejected, (state) => {
        state.lessons.isFetching = false;
      })

      .addCase(fetchRatingDatesAction.pending, (state) => {
        state.dates.isFetching = true;
      })
      .addCase(fetchRatingDatesAction.fulfilled, (state, action) => {
        state.dates.data = action.payload;
        state.dates.isFetching = false;
      })
      .addCase(fetchRatingDatesAction.rejected, (state) => {
        state.dates.isFetching = false;
      });
  },
});
