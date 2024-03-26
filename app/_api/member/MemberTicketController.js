import fetchData from "../config";

export const getMany = (token) => {
  return fetchData("membertickets", "GET", undefined, token);
};
