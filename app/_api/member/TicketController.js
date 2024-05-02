import fetchData from "../config";

export const getMany = () => {
  return fetchData(`tickets`, "GET");
};

export const getOne = (id, token) => {
  return fetchData(`tickets/${id}`, "GET", undefined, token);
};
