
import "./admin.css";
import Home from "../pages/home/Home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function Admin() {
  return (
    <>
      <div className="container">
          <Link exact to="/admin">
            <Home />
          </Link>

      </div>
    </>
  );
}

export default Admin;