import fetchData from "../config";

export const getOne = (id) => {
  return fetchData(`users/${id}`, "GET");
};

export const update = (id, body) => {
  return fetchData(`users/${id}`, "PATCH", body);
};
