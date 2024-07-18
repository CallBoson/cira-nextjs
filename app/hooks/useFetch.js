import { useState, useEffect, useCallback } from "react";
export async function fetcher({ url, method, body }) {
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res;
}

export function useFetch({ url, method = "POST", body, fetchOnMount = true }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher({ url, method, body });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, signal]);

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }

    return () => controller.abort();
  }, [fetchData]);

  return { data, isLoading, error, mutate: fetchData };
}

export default useFetch;
