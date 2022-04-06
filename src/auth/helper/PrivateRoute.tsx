import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getJwtfromLocalstorage } from ".";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return (
    <>
      {getJwtfromLocalstorage() !== null ? (
        children
      ) : (
        <Navigate replace to="/signin" />
      )}
    </>
  );
};

export default PrivateRoute;
