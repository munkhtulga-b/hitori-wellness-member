import fetchData from "../config";

const checkEmail = (body) => {
  return fetchData(`auth/check-email`, "POST", body);
};

export default checkEmail;
