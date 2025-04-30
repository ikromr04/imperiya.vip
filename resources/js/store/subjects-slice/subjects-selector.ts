import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getSubjects = (state: State)=> state[SliceName.Subjects].subjects.data;

export const getSubjectsStatus = (state: State)=> state[SliceName.Subjects].subjects.status;
