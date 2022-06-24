import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import api from "./api/api.js";
import { authContext } from "./contexts/authContext.js";
import { me } from "./api/auth.js";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import "./App.css";

function App() {
  const [refreshToken, setRefreshToken] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      setToken(localStorage.getItem("token"));
      setRefreshToken(localStorage.getItem("refresh"));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated === true && token !== "") {
      me(token).then((response) => setUser(response.data.data));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log("intercepted", error);
        const originalRequest = error.config;
        if (error.config.url !== "auth/refresh" && error.status === 401 && originalRequest._retry !== true) {
          originalRequest._retry = true;
          if (refreshToken && refreshToken !== "") {
            await api
              .post("auth/refresh")
              .then((response) => {
                api.defaults.headers.common["authorization"] = `Bearer ${response.data.data.access_token}`;
                originalRequest.headers["authorization"] = `Bearer ${response.data.data.access_token}`;
                setRefreshToken(response.data.data.refresh_token);
                setToken(response.data.data.access_token);
              })
              .catch((error) => {
                console.log(error.response.status);
                setRefreshToken(null);
                setIsAuthenticated(false);
              });
            return api(originalRequest);
          }
        }
      }
    );
  }, []);

  return (
    <div className="App">
      <authContext.Provider
        value={{ refreshToken, setRefreshToken, setIsAuthenticated, isAuthenticated, user, setUser, setToken }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </authContext.Provider>
    </div>
  );
}

export default App;
