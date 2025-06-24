//get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

//remove token
export const removeToken = () => {
  return localStorage.removeItem("token");
};

// Remove user
export const removeUser = () => localStorage.removeItem("user");

// api url
export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

// image url
export const BACKEND_IMG_URL = import.meta.env.VITE_BACKEND_PORT_IMG;
