import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // 初始化state
  const [storedValue, setStoredValue] = useState(initialValue);

  // 当组件挂载后，从localStorage中读取值
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  // 更新localStorage和state的函数
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
