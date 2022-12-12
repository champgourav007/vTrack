export const getCurrentLocale = () => {
    try {
      const currentLocale = localStorage.getItem('currentLocale');
      if (currentLocale === null) {
        return undefined;
      }
      return JSON.parse(currentLocale);
    } catch (e) {
      return undefined;
    }
  };
  
  export const setCurrentLocale = (currentLocale) => {
    localStorage.setItem('currentLocale', JSON.stringify(currentLocale));
  };

export const removeLocalStorageItem = (key) =>
  localStorage.removeItem(key);

export const getLocalStorageItem = (key) =>
  window.localStorage.getItem(key) || '';

export const setLocalStorageItem = (key, value) =>
  window.localStorage.setItem(key, value);
