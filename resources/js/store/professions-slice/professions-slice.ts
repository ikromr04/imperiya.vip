import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '@/const/store';
import { Professions } from '@/types/professions';
import { fetchProfessionsAction } from './professions-api-actions';

export type ProfessionsSlice = {
  professions: {
    data: Professions | null;
    isFetching: boolean;
  };
}

const initialState: ProfessionsSlice = {
  professions: {
    data: null,
    isFetching: false,
  },
};

export const professionsSlice = createSlice({
  name: SliceName.Professions,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfessionsAction.pending, (state) => {
        state.professions.isFetching = true;
      })
      .addCase(fetchProfessionsAction.fulfilled, (state, action) => {
        state.professions.data = action.payload;
        state.professions.isFetching = false;
      })
      .addCase(fetchProfessionsAction.rejected, (state) => {
        state.professions.isFetching = false;
      });
  },
});
