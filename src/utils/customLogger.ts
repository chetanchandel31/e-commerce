/** logs stuff without flooding test terminal */
export const customLogger = (message?: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV !== "test") console.log(message, ...optionalParams);
};
