export type User = {
  email: string;
  name: string;
  role: number;
  _id: string;
};

export type UserInfo = {
  token: string;
  user: User;
};

export type Category = {
  createdAt: string;
  name: string;
  updatedAt: string;
  _id: string;
};
