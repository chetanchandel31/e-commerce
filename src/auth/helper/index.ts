import { API } from "api";

// TODO: better type annotations
export const signup = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await API.post("/signup", user);

    return res.data;
  } catch (error: any) {
    console.log(JSON.stringify(error), "error");
    return error?.response?.data;
  }
};

export const signin = async (user: any) => {
  try {
    const res = await API.post("/signin", user);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const authenticate = (data: any, next: any) => {
  localStorage.setItem("jwt", JSON.stringify(data));
  next();
};

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
