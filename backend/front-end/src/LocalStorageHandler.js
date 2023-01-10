export const storeDataLocal = (name, data) => {
  data = JSON.stringify(data);
  localStorage.setItem(name, data);
};

export const getDataFromLocal = (name) => {
  return localStorage.getItem(name);
};
