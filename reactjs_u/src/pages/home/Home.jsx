import React, { useContext, useEffect, useState } from "react";
// import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import "./home.css"
import { AuthContext } from "../../context/Auth";
import axios from "axios";
import { getAllFriendRequestsRoute } from "../../utils/ApiRoutes";
import { Alert, Paper } from "@mui/material";

export default function Home() {

  const { isLoading, token } = useContext(AuthContext);

  return (

    <>
    {/* <Topbar /> */}
    <div className="homeContainer">

      <Sidebar />
      <Feed/>
      <Rightbar/>
    </div>
  </>
  );
}