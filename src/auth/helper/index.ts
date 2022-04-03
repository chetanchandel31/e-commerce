import { API } from "api";

// TODO: better type annotations

export const authenticate = (data: any, next: any) => {
  localStorage.setItem("jwt", JSON.stringify(data));
  next();
};

export const getJwtfromLocalstorage = () =>
  typeof localStorage.getItem("jwt") === "string"
    ? JSON.parse(localStorage.getItem("jwt") as string)
    : false;

export const signout = async (next: any) => {
  localStorage.removeItem("jwt");
  next();

  try {
    const res = await API.get("/signout");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
