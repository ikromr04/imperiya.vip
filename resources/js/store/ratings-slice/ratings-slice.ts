import { createSlice } from '@reduxjs/toolkit';
import { AsyncStatus, SliceName } from '@/const/store';
import { RatingDates } from '@/types/ratings';
import { fetchRatingDatesAction } from './ratings-api-actions';

export type RatingsSlice = {
  ratings: {
    status: AsyncStatus;
  };
  dates: {
    data?: RatingDates;
    status: AsyncStatus;
  };
}

const initialState: RatingsSlice = {
  ratings: {
    status: AsyncStatus.Idle,
  },
  dates: {
    status: AsyncStatus.Idle,
  },
};

export const ratingsSlice = createSlice({
  name: SliceName.Ratings,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRatingDatesAction.pending, (state) => {
        state.dates.status = AsyncStatus.Loading;
      })
      .addCase(fetchRatingDatesAction.fulfilled, (state, action) => {
        state.dates.status = AsyncStatus.Succeeded;
        state.dates.data = action.payload;
      })
      .addCase(fetchRatingDatesAction.rejected, (state) => {
        state.dates.status = AsyncStatus.Failed;
      });
  },
});
