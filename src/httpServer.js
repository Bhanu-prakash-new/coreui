import apiUrl from "./app.constants";

export const httpCall = async (url, method, params) => {
  let response = await fetch(apiUrl + url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return response.json();
};

export const httpMethods = {
  post: "post",
  get: "get",
  delete: "delete",
};
