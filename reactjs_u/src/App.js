import React, { useContext, useEffect } from "react";
import {
  
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Chat from "./pages/Chat";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/Register";
import { AuthContext } from "./context/Auth";
import ProtectedRoute from "./components/PrivateRoute";
import Topbar from "./components/topbar/Topbar";

import People from "./pages/People";
import Admin from "./Admin/Admin";

function App() {
  const location = useLocation();

  const { isLoading, token, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && location.pathname === "/login") {
      user.role === "admin" ? navigate("/admin") : navigate("/dashboard");
    }
  }, [token, user, location.pathname]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {token && user && (
        <>
          <Topbar />
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to={`/profile/${user._id}`}>Profile</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>
              <li>
                <button onClick={logout}>logout</button>
              </li>
            </ul>
          </nav>
        </>
      )}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route
          element={
            <ProtectedRoute
              isAuthLoading={isLoading}
              isAllowed={user && user.role === "admin"}
            />
          }
        >
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/admin/user/{user.id}" element={<User />} /> */}
          <Route path="/admin/users" element={<Home />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAuthLoading={isLoading}
              isAllowed={user && user.role === "user"}
            />
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/persons" element={<People />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
