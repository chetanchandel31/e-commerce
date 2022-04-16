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
    // w/o fragment it'd cause an error inside <Routes></Routes>
    // eslint-disable-next-line react/jsx-no-useless-fragment
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
