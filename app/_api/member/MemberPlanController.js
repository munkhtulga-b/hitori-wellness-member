import fetchData from "../config";

export const getMany = () => {
  return fetchData(`memberplans`, "GET");
};

export const getOne = (id) => {
  return fetchData(`memberplans/${id}`, "GET");
};
