import { createQueryString } from "@/app/_utils/helpers";
import fetchData from "../config";

export const getMany = (queries) => {
  const queryString = createQueryString(queries);
  return fetchData(`programs${queryString}`, "GET");
};

export const getOne = (id) => {
  return fetchData(`programs/${id}`, "GET");
};
