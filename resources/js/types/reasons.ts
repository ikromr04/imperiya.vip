import { ID } from '.';

export type ReasonId = ID;

export type Reason = {
  id: ReasonId;
  description: string;
};

export type Reasons = Reason[];
