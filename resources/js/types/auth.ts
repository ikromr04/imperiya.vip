import { UserId } from './users';
import { ID } from './index';

export type AuthUser = {
  id: UserId;
  name: string;
  login: string;
  avatar?: string;
  avatarThumb?: string;
};

export type RegisterLinkId = ID;

export type RegisterLink = {
  id: RegisterLinkId;
  token: string;
  expiresAt: string;
};

export type RegisterLinks = RegisterLink[];
