import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { authRedirect } from "./actions";

const fetchData = async (endpoint, method, body) => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_DEV_BASE_URL
      : process.env.NEXT_PUBLIC_PROD_BASE_URL;

  try {
    const headers = {
      "Content-Type": "application/json",
      "x-user-type": "user",
    };

    const init = {
      method: method,
      headers: headers,
      credentials: "include",
    };

    if (body) {
      init["body"] = JSON.stringify(body);
    }

    const response = await fetch(`${baseURL}/${endpoint}`, init);

    const isOk = response.ok;
    const status = response.status;
    const data = await response.json();
    const range = response.headers.get("Content-Range");

    if (!isOk) {
      if (status === 401) {
        const refreshToken = Cookies.get("token");
        const accessResponse = await fetch(`${baseURL}/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: refreshToken }),
          credentials: "include",
        });
        if (accessResponse.ok && accessResponse.status !== 401) {
          window.location.reload();
        } else {
          authRedirect();
        }
      } else {
        toast.error(data?.error?.message || "An error occurred");
      }
    }

    return {
      isOk,
      status,
      data,
      range,
    };
  } catch (error) {
    return error;
  }
};

export default fetchData;
