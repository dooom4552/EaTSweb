export const getLocalStorage = (key: string) => {
  const result = window.localStorage.getItem(key);

  return result ? JSON.parse(result) : null;
};
