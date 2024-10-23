import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));
    try {
      const result = await asyncFunction();
      setState({ data: result, error: null, isLoading: false });
      return result;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error('An unknown error occurred');
      setState({ data: null, error: errorObject, isLoading: false });
      throw errorObject;
    }
  }, []);

  return { ...state, execute };
}