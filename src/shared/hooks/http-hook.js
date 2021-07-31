import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]); //if user change page, while fetching

  const sendRequest = useCallback(
    //to avoid infinite loops
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortctrl = new AbortController();
      activeHttpRequests.current.push(httpAbortctrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortctrl.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortctrl
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };
  //to cleanup
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
