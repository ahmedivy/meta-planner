import { useState, useEffect } from "react";

import { timeSince } from "../utils";

export function useTimeSince(date) {
  const [time, setTime] = useState(() => {
    return timeSince(date);
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeSince(date));
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);
  return time;
}
