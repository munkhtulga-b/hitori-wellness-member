import { createQueryString } from "@/app/_utils/helpers";
import fetchData from "../config";

export const getMany = (token, queries) => {
  const queryString = createQueryString(queries);
  return fetchData(`membertickets${queryString}`, "GET", undefined, token);
};
