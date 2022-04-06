import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getJwtfromLocalstorage } from ".";

type AdminRouteProps = {
  children: ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  // TODO: redirect somewhere more sensible than "/signin"
  return (
    <>
      {getJwtfromLocalstorage() !== null &&
      getJwtfromLocalstorage()?.user?.role === 1 ? (
        children
      ) : (
        <Navigate replace to="/signin" />
      )}
    </>
  );
};

export default AdminRoute;
