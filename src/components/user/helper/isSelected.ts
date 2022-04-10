import { Location } from "react-router-dom";

export const isSelected = (location: Location, pathname: string) =>
  location.pathname === pathname;
