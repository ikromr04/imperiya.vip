import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '@/const/store';
import { fetchSchedulesAction } from './schedules-api-actions';

export type SchedulesSlice = {
  schedules: {
    isFetching: boolean;
  };
}

const initialState: SchedulesSlice = {
  schedules: {
    isFetching: false,
  },
};

export const schedulesSlice = createSlice({
  name: SliceName.Schedules,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSchedulesAction.pending, (state) => {
        state.schedules.isFetching = true;
      })
      .addCase(fetchSchedulesAction.fulfilled, (state) => {
        state.schedules.isFetching = false;
      })
      .addCase(fetchSchedulesAction.rejected, (state) => {
        state.schedules.isFetching = false;
      });
  },
});
