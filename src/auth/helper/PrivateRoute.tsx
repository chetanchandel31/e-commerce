import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getJwtfromLocalstorage } from ".";

type PrivateRouteProps = {
  route: ReactNode;
};

const PrivateRoutes = ({ route }: PrivateRouteProps) => {
  return (
    <>
      {getJwtfromLocalstorage() !== null ? (
        route
      ) : (
        <Navigate replace to="/signin" />
      )}
    </>
  );
};

export default PrivateRoutes;
