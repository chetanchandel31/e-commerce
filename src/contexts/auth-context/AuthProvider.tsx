import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "shared-types";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userInfoInitialValue = localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt") as string)
    : null;

  const [userInfo, setUserInfo] = useState<UserInfo | null>(
    userInfoInitialValue
  );

  const navigate = useNavigate();

  // 0. network req
  // 1. change state
  // 2. set local storage
  // 3. redirect

  const signIn = (userInfo: UserInfo) => {
    setUserInfo(userInfo);
    localStorage.setItem("jwt", JSON.stringify(userInfo));

    if (userInfo.user.role === 1) navigate("/admin/dashboard");
    else navigate("/user/dashboard");
  };

  const signOut = () => {
    setUserInfo(null);
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ setUserInfo, signIn, signOut, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
