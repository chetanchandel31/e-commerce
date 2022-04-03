export type SignupReqBody = { email: string; name: string; password: string };
export type SignupResponse = {
  email: string;
  name: string;
  role: number;
  _id: string;
};

export type SigninReqBody = { email: string; password: string };
export type SigninResponse = {
  token: string;
  user: {
    email: string;
    name: string;
    role: number;
    _id: string;
  };
};
