import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import "./admin.css";
import Home from "../pages/home/Home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";

function Admin() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
          <Link exact to="/admin">
            <Home />
          </Link>
          <Link to="/admin/users">
            <UserList />
          </Link>
          <Link to="/admin/user/{user.id}">
            <User />
          </Link>
          <Link to="/admin/user/newUser">
            <NewUser />
          </Link>
      </div>
    </>
  );
}

export default Admin;