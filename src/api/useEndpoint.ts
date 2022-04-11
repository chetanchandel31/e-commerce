import { API } from "api";
import { useState } from "react";
import { getRequestHeaders } from "./getRequestHeaders";

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

type MakeRequestReturnType = {
  data: any;
  type: "success" | "error";
};

const useEndpoint = <RequestBody, Response>(args: Args) => {
  const { endpoint, method = "GET" } = args;

  // `RESULT` WILL BE TRUTHY ONLY IF REQUEST SUCCEEDS, A FAILED REQUEST'S RESPONSE GOES TO `ERROR` AND NOT TO `RESULT`
  const [result, setResult] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: onload
  // TODO: can add logic for optimal updates (POST, PUT and DELETE) here only?

  const makeRequest = async (
    reqBody: RequestBody
  ): Promise<MakeRequestReturnType> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await API({
        url: endpoint,
        method,
        data: reqBody,
        headers: getRequestHeaders(), // always adds bearer token if we have it in local storage
      });
      setResult(res.data as Response);

      return { data: res.data as Response, type: "success" };
    } catch (error: any) {
      console.log(error, `${method} request to ${endpoint} failed`);

      setError(
        error?.response?.data?.error ||
          "network request failed, please check console"
      );
      return { data: error?.response?.data, type: "error" };
      // TODO: we don't reset `result` when request fails but maybe should have an option to do so
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, makeRequest, result };
};

export default useEndpoint;
