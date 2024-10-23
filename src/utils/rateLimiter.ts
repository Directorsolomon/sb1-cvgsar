import { useState, useEffect } from 'react';

const RATE_LIMIT = 5; // Number of allowed actions
const TIME_WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)

export function useRateLimiter() {
  const [actions, setActions] = useState<number[]>([]);

  useEffect(() => {
    const now = Date.now();
    setActions(prevActions => prevActions.filter(time => now - time < TIME_WINDOW));
  }, [actions]);

  const checkRateLimit = () => {
    const now = Date.now();
    if (actions.length >= RATE_LIMIT) {
      return false;
    }
    setActions(prevActions => [...prevActions, now]);
    return true;
  };

  return checkRateLimit;
}