import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '@/const/store';
import { Nationalities } from '@/types/nationalities';
import { fetchNationalitiesAction } from './nationalities-api-actions';

export type NationalitiesSlice = {
  nationalities: {
    data: Nationalities | null;
    isFetching: boolean;
  };
}

const initialState: NationalitiesSlice = {
  nationalities: {
    data: null,
    isFetching: false,
  },
};

export const nationalitiesSlice = createSlice({
  name: SliceName.Nationalities,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNationalitiesAction.pending, (state) => {
        state.nationalities.isFetching = true;
      })
      .addCase(fetchNationalitiesAction.fulfilled, (state, action) => {
        state.nationalities.data = action.payload;
        state.nationalities.isFetching = false;
      })
      .addCase(fetchNationalitiesAction.rejected, (state) => {
        state.nationalities.isFetching = false;
      });
  },
});
