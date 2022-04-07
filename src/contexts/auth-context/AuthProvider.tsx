import { ReactNode, useState } from "react";
import { UserInfo } from "shared-types";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userInfoInitialValue = localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt") as string)
    : null;

  const [userInfo, setUserInfo] = useState<UserInfo | null>(
    userInfoInitialValue
  );

  // 0. network req
  // 1. change state
  // 2. set local storage
  // 3. redirect

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
