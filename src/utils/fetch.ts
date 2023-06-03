import axios, { RawAxiosRequestHeaders } from "axios";
import { Method } from "axios";

export const fetch = async (
  url: string,
  method: Method,
  headers?: RawAxiosRequestHeaders,
  params?: any
) => {
  if (!headers)
    headers = {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${process.env.TMPD_READ_TOKEN}`
    };

  const response = await axios(url, {
    method,
    headers,
    params,
  });

  return response.data;
};
