import { User, UserInfo } from "shared-types";

export type SignupReqBody = { email: string; name: string; password: string };
export type SignupResponse = User;

export type SigninReqBody = { email: string; password: string };
export type SigninResponse = UserInfo;
