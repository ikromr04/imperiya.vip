import { ID } from '.';

export type ProfessionId = ID;

export type Profession = {
  id: ProfessionId;
  name: string;
};

export type Professions = Profession[];
