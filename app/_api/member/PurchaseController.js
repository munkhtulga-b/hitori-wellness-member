import fetchData from "../config";

export const getMany = () => {
  return fetchData("purchases", "GET");
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
