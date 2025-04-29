import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getProfessions = (state: State) => state[SliceName.Professions].professions.data;

export const getProfessionsStatus = (state: State) => state[SliceName.Professions].professions.status;
