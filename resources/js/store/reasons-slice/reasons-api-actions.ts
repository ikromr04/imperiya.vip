import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '@/const/routes';
import { ValidationError } from '@/types/validation-error';
import { generatePath } from 'react-router-dom';
import { Reason, ReasonId, Reasons } from '@/types/reasons';
import { ReasonUpdateDTO } from '@/dto/reasons';

export const fetchReasonsAction = createAsyncThunk<Reasons, undefined, {
  extra: AxiosInstance;
}>(
  'reasons/fetchReasons',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Reasons>(APIRoute.Reasons.Index);

    return data;
  },
);

export const storeReasonAction = createAsyncThunk<Reason, {
  description: string,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'reasons/storeReason',
  async ({ description, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Reason>(APIRoute.Reasons.Index, { description });
      if (onSuccess) onSuccess();
      return data;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateReasonAction = createAsyncThunk<Reason, {
  dto: ReasonUpdateDTO;
  onSuccess?: () => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'reasons/updateReason',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Reason>(generatePath(APIRoute.Reasons.Show, { id: dto.id }), dto);
      if (onSuccess) onSuccess();
      return data;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteReasonAction = createAsyncThunk<ReasonId, {
  id: ReasonId,
  onSuccess?: () => void,
}, {
  extra: AxiosInstance
}>(
  'reasons/deleteReason',
  async ({ id, onSuccess }, { extra: api }) => {
    await api.delete(generatePath(APIRoute.Reasons.Show, { id }));
    if (onSuccess) onSuccess();
    return id;
  },
);
