import fetchData from "../config";

export const getMany = (token) => {
  return fetchData(`memberplans`, "GET", undefined, token);
};

export const getOne = (id) => {
  return fetchData(`memberplans/${id}`, "GET");
};

export const cancel = (id) => {
  return fetchData(`memberplans/cancel/${id}`, "DELETE");
};
