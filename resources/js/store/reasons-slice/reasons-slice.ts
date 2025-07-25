import { createSlice } from '@reduxjs/toolkit';
import { AsyncStatus, SliceName } from '@/const/store';
import { Reasons } from '@/types/reasons';
import {
  deleteReasonAction,
  fetchReasonsAction,
  storeReasonAction,
  updateReasonAction,
} from './reasons-api-actions';

export type ReasonsSlice = {
  reasons: {
    data?: Reasons;
    status: AsyncStatus;
  };
}

const initialState: ReasonsSlice = {
  reasons: {
    status: AsyncStatus.Idle,
  },
};

export const reasonsSlice = createSlice({
  name: SliceName.Reasons,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReasonsAction.pending, (state) => {
        state.reasons.status = AsyncStatus.Loading;
      })
      .addCase(fetchReasonsAction.fulfilled, (state, action) => {
        state.reasons.status = AsyncStatus.Succeeded;
        state.reasons.data = action.payload;
      })
      .addCase(fetchReasonsAction.rejected, (state) => {
        state.reasons.status = AsyncStatus.Failed;
      })

      .addCase(storeReasonAction.fulfilled, (state, action) => {
        if (state.reasons.data) {
          state.reasons.data = [action.payload, ...state.reasons.data];
        }
      })
      .addCase(updateReasonAction.fulfilled, (state, action) => {
        if (state.reasons.data) {
          const index = state.reasons.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.reasons.data[index] = action.payload;
          }
        }
      })

      .addCase(deleteReasonAction.fulfilled, (state, action) => {
        if (state.reasons.data) {
          state.reasons.data = state.reasons.data.filter(({ id }) => id !== action.payload);
        }
      });
  },
});
