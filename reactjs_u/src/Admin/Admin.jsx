
import "./admin.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Discussion from "./pages/Discussion";


function Admin() {
  console.log("Admin");
  return (
    <>
      <div className="container">
          {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Home />} />
          <Route path="/discussions" element={<Discussion />} />
          </Routes> */}


      </div>
    </>
  );
}

export default Admin;