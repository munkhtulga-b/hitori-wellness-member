import fetchData from "../config";
import { createQueryString } from "@/app/_utils/helpers";

export const getMany = (queries, token) => {
  const queryString = createQueryString(queries);
  return fetchData(`reservations${queryString}`, "GET", undefined, token);
};

export const getOne = (id) => {
  return fetchData(`reservations/${id}`, "GET");
};

export const create = (body) => {
  return fetchData(`reservations`, "POST", body);
};

export const getAllTimeSlots = (queries) => {
  const queryString = createQueryString(queries);
  return fetchData(`timeslots${queryString}`, "GET");
};

export const getTimeSlot = (id) => {
  return fetchData(`timeslots/${id}`, "GET");
};
