import fetchData from "../config";

export const getMany = () => {
  return fetchData("studios", "GET");
};

export const getOne = (id) => {
  return fetchData(`studios/${id}`, "GET");
};
