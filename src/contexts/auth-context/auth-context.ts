import { createContext } from "react";
import { UserInfo } from "shared-types";

type AuthContextInterface = {
  // eslint-disable-next-line no-unused-vars
  signIn: (userInfo: UserInfo) => void;
  signOut: () => void;
  userInfo: UserInfo | null;
};

const logWarning = () =>
  console.warn("maybe the component isn't wrapped with auth-context");

export const AuthContext = createContext<AuthContextInterface>({
  signIn: logWarning,
  signOut: logWarning,
  userInfo: null,
});
