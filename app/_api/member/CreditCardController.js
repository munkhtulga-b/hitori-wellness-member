import fetchData from "../config";

export const getMany = () => {
  return fetchData("cards", "GET");
};

export const getOne = (id) => {
  return fetchData(`cards/${id}`, "GET");
};

export const create = (body) => {
  return fetchData("cards", "POST", body);
};

export const update = (id, body) => {
  return fetchData(`cards/${id}`, "PATCH", body);
};

export const remove = (id) => {
  return fetchData(`cards/${id}`, "DELETE");
};
