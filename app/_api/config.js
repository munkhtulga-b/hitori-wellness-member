const fetchData = async (endpoint, method, body) => {
  const baseURL = "https://gymapi.reddtech.ai/api/v1";
  try {
    const response = await fetch(`${baseURL}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const status = response.status;
    const data = await response.json();
    return {
      status,
      data,
    };
  } catch (error) {
    return error;
  }
};

export default fetchData;
