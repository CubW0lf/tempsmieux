import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { authContext } from "./contexts/authContext.js";
import { me, refresh } from "./api/auth.js";
import { api } from "./api/api.js";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import * as jose from "jose";
import "./App.css";

function App() {
  const [refreshToken, setRefreshToken] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setRefreshToken(JSON.stringify(localStorage.getItem("refresh")));
    }
  }, []);

  useEffect(() => {
    if (token !== "") {
      const decoded = jose.decodeJwt(token);

      if (Date.now() < decoded.exp * 1000) {
        setIsAuthenticated(true);
      } else {
        console.log("token périmé");
        setIsAuthenticated(false);
        refresh(refreshToken).then((response) => {
          api.defaults.headers.common["authorization"] = `Bearer ${response.data.data.access_token}`;
          localStorage.setItem("token", response.data.data.access_token);
          localStorage.setItem("refresh", response.data.data.refresh_token);
          setIsAuthenticated(true);
        });
      }
    }

    if (isAuthenticated === true && token !== "") {
      me(token).then((response) => setUser(response.data.data));
    }
  }, [isAuthenticated, token, refreshToken]);

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
