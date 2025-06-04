import { useState } from "react";
import { useEventCallback } from "./useEventCallback";
import { useEventListener } from "./useEventListener";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Use event callback to prevent recreation on every render
  const setValue = useEventCallback((value: T | ((val: T) => T)) => {
    try {
      // Use setStoredValue with function form to get current value
      setStoredValue((currentValue) => {
        const valueToStore = value instanceof Function ? value(currentValue) : value;
        
        // Save to local storage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        
        return valueToStore;
      });
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  });

  // Listen for storage changes from other tabs/windows
  useEventListener('storage', (e) => {
    if (e.key === key && e.newValue) {
      try {
        setStoredValue(JSON.parse(e.newValue));
      } catch (error) {
        console.error(`Error parsing localStorage value for key "${key}":`, error);
      }
    }
  });

  return [storedValue, setValue];
}
