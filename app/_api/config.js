import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { authRedirect } from "./actions";

const fetchData = async (endpoint, method, body, serverToken) => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_DEV_BASE_URL
      : process.env.NEXT_PUBLIC_PROD_BASE_URL;

  const token = Cookies.get("token") ? Cookies.get("token") : serverToken;

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const init = {
      method: method,
      headers: headers,
    };

    if (body) {
      init["body"] = JSON.stringify(body);
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseURL}/${endpoint}`, init);

    const isOk = response.ok;
    const status = response.status;
    const data = await response.json();
    const range = response.headers.get("Content-Range");

    if (!isOk) {
      // Redirects the user back to login page if their token has expired
      if (status === 401) {
        const refreshToken = JSON.parse(localStorage.getItem("user-storage"))
          ?.state?.user?.token;
        const accessResponse = await fetch(`${baseURL}/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: refreshToken }),
        });
        if (accessResponse.ok && accessResponse.status !== 401) {
          const { access_token } = await accessResponse.json();
          Cookies.set("token", access_token);
          window.location.reload();
        } else {
          Cookies.remove("token");
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
