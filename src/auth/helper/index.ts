// TODO: better type annotations

// export const authenticate = (data: any, next: any) => {
//   localStorage.setItem("jwt", JSON.stringify(data));
//   next();
// };

export const getJwtfromLocalstorage = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt") as string)
    : null;

// TODO: remove when content
// export const signout = async (next: any) => {
//   localStorage.removeItem("jwt");
//   next();

//   try {
//     const res = await API.get("/signout");
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
