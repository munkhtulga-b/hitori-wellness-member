import fetchData from "../config";

export const getMany = (token) => {
  return fetchData("reservations", "GET", undefined, token);
};

export const getOne = (id) => {
  return fetchData(`reservations/${id}`, "GET");
};
