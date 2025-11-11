import { User as BaseUser } from "better-auth";

export type ID = string;

export type User = BaseUser & {
  id: ID;
  username: string;
  phone?: string;
  image?: string;
  birthDate?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
