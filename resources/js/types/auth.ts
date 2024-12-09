import { UserId } from './users';

export type AuthUser = {
  id: UserId;
  name: string;
  login: string;
  avatar?: string;
  avatar_thumb?: string;
};
