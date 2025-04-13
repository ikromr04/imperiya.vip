import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '@/const/store';
import { Subjects } from '@/types/subjects';
import { fetchSubjectsAction, storeSubjectAction, updateSubjectAction } from './subjects-api-actions';

export type SubjectsSlice = {
  subjects: {
    data: Subjects | null;
    isFetching: boolean;
  };
}

const initialState: SubjectsSlice = {
  subjects: {
    data: null,
    isFetching: false,
  },
};

export const subjectsSlice = createSlice({
  name: SliceName.Subjects,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSubjectsAction.pending, (state) => {
        state.subjects.isFetching = true;
      })
      .addCase(fetchSubjectsAction.fulfilled, (state, action) => {
        state.subjects.data = action.payload;
        state.subjects.isFetching = false;
      })
      .addCase(fetchSubjectsAction.rejected, (state) => {
        state.subjects.isFetching = false;
      })

      .addCase(storeSubjectAction.fulfilled, (state, action) => {
        if (state.subjects.data) {
          state.subjects.data = [action.payload, ...state.subjects.data];
        }
      })
      .addCase(updateSubjectAction.fulfilled, (state, action) => {
        if (state.subjects.data) {
          const index = state.subjects.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.subjects.data[index] = action.payload;
          }
        }
      });
  },
});
