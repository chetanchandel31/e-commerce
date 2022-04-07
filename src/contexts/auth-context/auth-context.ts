import { createContext } from "react";
import { UserInfo } from "shared-types";

export const AuthContext = createContext<{
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}>({
  setUserInfo: () =>
    console.warn("maybe the component isn't wrapped with auth-context"),
  userInfo: null,
});
