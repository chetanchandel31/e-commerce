import { API } from "api";
import { useState } from "react";

type Args =
  | {
      endpoint: string;
      method?: "GET";
      /** allowed only for `GET` method */
      fetchOnFirstRender?: boolean;
    }
  | {
      endpoint: string;
      method?: "POST" | "PUT" | "DELETE";
      /** allowed only for `GET` method */
      fetchOnFirstRender?: false;
    };

const useEndpoint = <RequestBody, Response>(args: Args) => {
  const { endpoint, method = "GET" } = args;

  // `RESULT` WILL BE TRUTHY ONLY IF REQUEST SUCCEEDS, A FAILED REQUEST'S RESPONSE GOES TO `ERROR` AND NOT TO `RESULT`
  const [result, setResult] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: onload
  // TODO: can add logic for optimal updates (POST, PUT and DELETE) here only?
  // TODO: something to add token to headers

  const makeRequest = async (reqBody: RequestBody) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await API({ url: endpoint, method, data: reqBody });
      setResult(res.data as Response);

      return res.data as Response;
    } catch (error: any) {
      console.log(error, `${method} request to ${endpoint} failed`);

      setError(
        error?.response?.data?.error ||
          "network request failed, please check console"
      );
      return error?.response?.data;
      // TODO: we don't reset `result` when request fails but maybe should have an option to do so
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, makeRequest, result };
};

export default useEndpoint;
