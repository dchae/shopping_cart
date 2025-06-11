import { useState, useEffect, useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);

  const get = useCallback(() => {
    try {
      const value = window.localStorage.getItem(key);

      return typeof value === "string" ? JSON.parse(value) : value;
    } catch (e) {
      console.log(e);
    }
  }, [key]);

  const set = useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    [key],
  );

  useEffect(() => {
    set(value);
  }, [set, value]);

  useEffect(() => {
    setValue(get());
  }, [get]);

  return [value, setValue];
};

export default useLocalStorage;
