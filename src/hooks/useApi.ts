import { useState, useCallback } from 'react';
import { CustomError, handleApiError } from '../utils/errorHandling';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CustomError | null>(null);

  const execute = useCallback(async <R>(apiCall: () => Promise<R>): Promise<R | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result as unknown as T);
      return result;
    } catch (err) {
      const customError = handleApiError(err);
      setError(customError);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, execute };
}