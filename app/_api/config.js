import { useState, useEffect } from "react";

function useFetch(endpoint, method, body) {
  const baseURL = "https://gymapi.reddtech.ai";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/${endpoint}`, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          signal: signal,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
      abortController.abort();
    };
  }, [body, endpoint, method]);

  return { data, loading, error };
}

export default useFetch;
