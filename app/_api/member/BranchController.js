import fetchData from "../config";

export const getMany = () => {
  return fetchData("studios", "GET");
};

export const getOne = (id) => {
  return fetchData(`studios/${id}`, "GET");
};

export const getPermitted = (serverToken) => {
  return fetchData("users/branch", "GET", undefined, serverToken);
};
