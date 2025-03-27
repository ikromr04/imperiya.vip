import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '@/const/store';
import { Schedules } from '@/types/schedules';
import {
  deleteScheduleAction,
  fetchSchedulesAction,
  storeScheduleAction,
  updateScheduleAction,
} from './schedules-api-actions';

export type SchedulesSlice = {
  schedules: {
    data: Schedules | null;
    isFetching: boolean;
  };
}

const initialState: SchedulesSlice = {
  schedules: {
    data: null,
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
      .addCase(fetchSchedulesAction.fulfilled, (state, action) => {
        state.schedules.data = action.payload;
        state.schedules.isFetching = false;
      })
      .addCase(fetchSchedulesAction.rejected, (state) => {
        state.schedules.isFetching = false;
      })

      .addCase(storeScheduleAction.fulfilled, (state, action) => {
        state.schedules.data = action.payload;
      })
      .addCase(updateScheduleAction.fulfilled, (state, action) => {
        state.schedules.data = action.payload;
      })
      .addCase(deleteScheduleAction.fulfilled, (state, action) => {
        state.schedules.data = action.payload;
      });
  },
});
