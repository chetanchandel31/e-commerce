import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getJwtfromLocalstorage } from ".";

type AdminRouteProps = {
  route: ReactNode;
};

const AdminRoutes = ({ route }: AdminRouteProps) => {
  // TODO: redirect somewhere more sensible than "/signin"
  return (
    <>
      {getJwtfromLocalstorage() !== null &&
      getJwtfromLocalstorage()?.user?.role === 1 ? (
        route
      ) : (
        <Navigate replace to="/signin" />
      )}
    </>
  );
};

export default AdminRoutes;
