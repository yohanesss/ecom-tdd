import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage<T>(key, defaultValue, window.localStorage);
};

export const useSessionStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage<T>(key, defaultValue, window.sessionStorage);
};

const useStorage = <T,>(
  key: string,
  defaultValue: T,
  storageObject: Storage
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
};
