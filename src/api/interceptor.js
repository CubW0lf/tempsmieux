import api from "./api.js";

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.log("intercepted", error);
//     const originalRequest = error.config;
//     if (error.config.url !== "auth/refresh" && error.status === 401 && originalRequest._retry !== true) {
//       originalRequest._retry = true;
//       if (refreshToken && refreshToken !== "") {
//         await api
//           .post("auth/refresh")
//           .then((response) => {
//             api.defaults.headers.common["authorization"] = `Bearer ${response.data.data.access_token}`;
//             originalRequest.headers["authorization"] = `Bearer ${response.data.data.access_token}`;
//             setRefreshToken(response.data.data.refresh_token);
//             setToken(response.data.data.access_token);
//           })
//           .catch((error) => {
//             console.log(error.response.status);
//             setRefreshToken(null);
//             setIsAuthenticated(false);
//           });
//         return api(originalRequest);
//       }
//     }
//   }
// );
