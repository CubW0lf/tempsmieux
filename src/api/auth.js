import api from "./api";
import jwtDecode from "jwt-decode";

export const hasAuthenticated = () => {
  const token = localStorage.getItem("Token");
  const isValid = token ? tokenIsValid(token) : false;

  if (isValid === false) {
    localStorage.removeItem("Token");
  }
  return isValid;
};

export const login = async (credentials) => {
  return await api
    .post(`auth/login`, credentials)
    .then((response) => {
      localStorage.setItem("token", response.data.data.access_token);
      localStorage.setItem("refresh", response.data.data.refresh_token);
      window.location.replace("/profile");
    })
    .catch((err) => console.error("Erreur de connexion", err.response.data.errors[0].message));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  window.location.replace("/");
};

export const tokenIsValid = (token) => {
  const { exp } = jwtDecode(token);

  if (exp * 1000 > new Date().getTime()) {
    return true;
  }

  return false;
};

export const me = async (token) => {
  return await api
    .get(`users/me?fields=*.*&access_token=${token}`)
    .then((data) => data)
    .catch((err) => console.error("Erreur de connexion", err.response.data.errors[0].message));
};

export const refresh = async (refresh_token) => {
  return await api
    .post("auth/refresh", { refresh_token: refresh_token })
    .then((response) => response)
    .catch((err) => console.error("Erreur de connexion", err.response.data.errors[0].message));
};
