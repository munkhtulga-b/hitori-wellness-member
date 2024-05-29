import { createQueryString } from "@/app/_utils/helpers";
import fetchData from "../config";

export const getMany = (queries) => {
  const queryString = createQueryString(queries);
  return fetchData(`purchases${queryString}`, "GET", undefined);
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
