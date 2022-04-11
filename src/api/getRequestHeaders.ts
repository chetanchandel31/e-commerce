export const getRequestHeaders = () => {
  const bearerToken = JSON.parse(localStorage.getItem("jwt") as string)?.token;

  return localStorage.getItem("jwt")
    ? {
        Authorization: `Bearer ${bearerToken}`,
      }
    : undefined;
};
