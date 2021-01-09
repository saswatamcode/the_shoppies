import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function useStickyState(defaultValue: any, key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue = Cookies.get(key);
    return stickyValue !== undefined ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    Cookies.set(key, JSON.stringify(value), { expires: 7 });
  }, [key, value]);
  return [value, setValue];
}

export default useStickyState;
