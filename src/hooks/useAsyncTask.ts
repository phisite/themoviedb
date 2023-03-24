import { useCallback, useState } from "react";

type TStatus = "IDLE" | "PROCESSING" | "ERROR" | "SUCCESS";

function useAsyncTask<T extends unknown[], R = unknown>(
  task: (...args: T) => Promise<R>
) {
  const [status, setStatus] = useState<TStatus>("IDLE");
  const [response, setResponse] = useState<unknown | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  const run = useCallback(async (...arg: T) => {
    setStatus("PROCESSING");
    try {
      const resp: R = await task(...arg);
      setResponse(resp);
      setStatus("SUCCESS");
      return resp;
    } catch (error) {
      setError(error);
      setStatus("ERROR");
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setStatus("IDLE");
  }, []);

  return {
    run,
    status,
    response,
    error,
    reset,
  };
}

export default useAsyncTask;
