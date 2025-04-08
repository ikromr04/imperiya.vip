import { ID } from '.';

export type NationalityId = ID;

export type Nationality = {
  id: NationalityId;
  name: string;
};

export type Nationalities = Nationality[];
