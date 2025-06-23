//get token
export const getToken = () => {
  return localStorage.getItem("token");
};

//remove token
export const removeToken = () => {
  return localStorage.removeItem("token");
};
