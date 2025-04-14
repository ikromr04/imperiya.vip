import { ID } from './index';

export type RegisterLinkId = ID;

export type RegisterLink = {
  id: RegisterLinkId;
  token: string;
  expiresAt: string;
};

export type RegisterLinks = RegisterLink[];
