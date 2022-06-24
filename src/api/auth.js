import api from "./api";

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

export const me = async (token) => {
  return await api
    .get(`users/me?fields=*.*&access_token=${token}`)
    .then((data) => data)
    .catch((err) => console.error("Erreur de connexion", err.response.data.errors[0].message));
};

export const refresh = async (token) => {
  return await api
    .post("/auth/refresh", { refresh_token: token })
    .then((response) => console.log(response))
    .catch((err) => console.error("Erreur de connexion", err.response.data.errors[0].message));
};
