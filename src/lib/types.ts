export type ID = string | number;

export type User = {
  id: ID;
  username: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  image?: string;
  birth_date?: string;
};
