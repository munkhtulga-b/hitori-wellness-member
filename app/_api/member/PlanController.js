import fetchData from "../config";
import { createQueryString } from "@/app/_utils/helpers";

export const getMany = (queries) => {
  const queryString = createQueryString(queries);
  return fetchData(`plans${queryString}`, "GET");
};

export const getOne = (id) => {
  return fetchData(`plans/${id}`, "GET");
};