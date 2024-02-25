import { toast } from "react-toastify";

const fetchData = async (endpoint, method, body) => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_DEV_BASE_URL
      : process.env.NEXT_PUBLIC_PROD_BASE_URL;

  const token = sessionStorage.getItem("token");

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseURL}/${endpoint}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });

    const isOk = response.ok;
    const status = response.status;
    const data = await response.json();

    if (!isOk) {
      toast.error(data.error.message ?? "An error occurred");
    }

    return {
      isOk,
      status,
      data,
    };
  } catch (error) {
    return error;
  }
};

export default fetchData;
