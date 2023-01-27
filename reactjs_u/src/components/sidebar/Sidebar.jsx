import React, { useContext, useEffect, useState } from 'react'
import "./sidebar.css";
import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School} from "@mui/icons-material";
import { Users } from "../../fakeData";
import CloseFriend from "../closeFriend/CloseFriend";
import { AuthContext } from '../../context/Auth';
import axios from 'axios';
import { getAllFriendsRoute } from '../../utils/ApiRoutes';

export default function Sidebar() {
  const { isLoading, token } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  
    const getFriends= async () => {
        try {
          const res = await axios.get(getAllFriendsRoute, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          console.log(res.data.friends);
          setFriends(res.data.friends);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        if (token) {
          getFriends();
        }
      }, []);
      
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          { friends && friends.length>0 && friends.map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
