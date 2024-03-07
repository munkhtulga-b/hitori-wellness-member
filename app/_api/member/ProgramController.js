import fetchData from "../config";

export const getMany = () => {
  return fetchData("programs", "GET");
};

export const getOne = (id) => {
  return fetchData(`programs/${id}`, "GET");
};
