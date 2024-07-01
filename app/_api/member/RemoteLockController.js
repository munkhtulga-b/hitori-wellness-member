import fetchData from "../config";

export const getQR = () => {
  return fetchData(`users/qrCode`, "GET");
};
