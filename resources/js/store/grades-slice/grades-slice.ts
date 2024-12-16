import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { Grades } from '../../types/grades';
import { fetchGradesAction } from './grades-api-actions';

export type GradesSlice = {
  grades: Grades | null;
}

const initialState: GradesSlice = {
  grades: null,
};

export const gradesSlice = createSlice({
  name: SliceName.Roles,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGradesAction.fulfilled, (state, action) => {
        state.grades = action.payload;
      });
  },
});
