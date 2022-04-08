import { useAuth } from "contexts/auth-context";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { userInfo } = useAuth();

  return (
    <>{userInfo !== null ? children : <Navigate replace to="/signin" />}</>
  );
};

export default PrivateRoute;
