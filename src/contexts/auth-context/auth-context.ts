import { createContext, Dispatch, SetStateAction } from "react";
import { UserInfo } from "shared-types";

type AuthContextInterface = {
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
  signIn: (userInfo: UserInfo) => void;
  signOut: () => void;
  userInfo: UserInfo | null;
};

const logWarning = () =>
  console.warn("maybe the component isn't wrapped with auth-context");

export const AuthContext = createContext<AuthContextInterface>({
  setUserInfo: logWarning,
  signIn: logWarning,
  signOut: logWarning,
  userInfo: null,
});
