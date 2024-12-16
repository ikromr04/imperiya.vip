import { createSlice } from '@reduxjs/toolkit';
import { fetchGendersAction } from './genders-api-actions';
import { SliceName } from '../../const';
import { Genders } from '../../types/genders';

export type GendersSlice = {
  genders: Genders | null;
}

const initialState: GendersSlice = {
  genders: null,
};

export const gendersSlice = createSlice({
  name: SliceName.Genders,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGendersAction.fulfilled, (state, action) => {
        state.genders = action.payload;
      });
  },
});
