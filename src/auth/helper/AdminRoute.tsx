import { useAuth } from "contexts/auth-context";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type AdminRouteProps = {
  children: ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { userInfo } = useAuth();
  // TODO: redirect somewhere more sensible than "/signin"

  return (
    <>
      {userInfo !== null && userInfo.user.role === 1 ? (
        children
      ) : (
        <Navigate replace to="/signin" />
      )}
    </>
  );
};

export default AdminRoute;
