import fetchData from "../config";

export const getMany = (token) => {
  return fetchData("purchases", "GET", undefined, token);
};

export const getOne = (id) => {
  return fetchData(`purchases/${id}`, "GET");
};

export const deleteOne = (id) => {
  return fetchData(`purchases/${id}`, "DELETE");
};

export const create = (body) => {
  return fetchData("purchases", "POST", body);
};
