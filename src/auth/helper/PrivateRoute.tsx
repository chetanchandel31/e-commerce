import { useAuth } from "contexts/auth-context";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { userInfo } = useAuth();

  return (
    // w/o redirect it'd cause an error inside <Routes></Routes>
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{userInfo !== null ? children : <Navigate replace to="/signin" />}</>
  );
};

export default PrivateRoute;
