import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { fetchNationalitiesAction } from './nationality-api-actions';
import { Nationalities } from '../../types/nationalities';

export type NationalitiesSlice = {
  nationalities: Nationalities | null;
}

const initialState: NationalitiesSlice = {
  nationalities: null,
};

export const nationalitiesSlice = createSlice({
  name: SliceName.Roles,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNationalitiesAction.fulfilled, (state, action) => {
        state.nationalities = action.payload;
      });
  },
});
