import { ID } from './index';

export type AuthUser = {
  id: ID;
  name: string;
  login: string;
  avatar?: string;
};
