import { createSlice } from '@reduxjs/toolkit';
import { fetchNationalitiesAction } from './nationality-api-actions';
import { Nationalities } from '@/types/nationalities';
import { SliceName } from '@/const/store';

export type NationalitiesSlice = {
  nationalities: Nationalities | null;
}

const initialState: NationalitiesSlice = {
  nationalities: null,
};

export const nationalitiesSlice = createSlice({
  name: SliceName.Nationalities,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNationalitiesAction.fulfilled, (state, action) => {
        state.nationalities = action.payload;
      });
  },
});
