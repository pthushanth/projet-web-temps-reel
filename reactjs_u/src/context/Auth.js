import React, { useState, createContext, useEffect } from "react";
import { loginRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("app-user")) || null
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("app-user-token"))?.accessToken || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    if (!token) {
      setIsLoading(true);
      setError(null);
      await loginRequest(username, password);
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("app-user-token");
    localStorage.removeItem("app-user");
    setError(null);
    setUser(null);
    setToken(null);
    setIsLoading(false);
    navigate("/login");
  };

  const loginRequest = async (username, password) => {
    console.log(loginRoute);
    const data = await fetch(loginRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const response = await data.json();
    if (data.status === 200) {
      // console.log(response);
      localStorage.setItem("app-user", JSON.stringify(response.user));
      localStorage.setItem(
        "app-user-token",
        JSON.stringify({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );
      setUser(response.user);
      setToken(response.accessToken);
      console.log(response.user);
      if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashbaord");
      }
    } else {
      setError(response.message);
    }
  };

  // useEffect(() => {
  //   const user = localStorage.getItem("app-user");
  //   const token = localStorage.getItem("app-user-token");
  //   if (user && token) {
  //     setUser(JSON.parse(user));
  //     setToken(JSON.parse(token).accessToken);
  //   }
  // }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
