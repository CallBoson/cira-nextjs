import { useState, useEffect, useCallback, useRef } from "react";

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
  const bodyRef = useRef(body);

  const fetchData = useCallback(
    async (newBody) => {
      setLoading(true);
      setError(null);
      if (newBody !== undefined) {
        bodyRef.current = newBody; // 更新存储的请求体
      }
      try {
        const response = await fetcher({ url, method, body: bodyRef.current });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        return json;
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [url, method, signal]
  );

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }

    return () => controller.abort();
  }, [fetchData]);

  return { data, isLoading, error, mutate: fetchData };
}

export default useFetch;
