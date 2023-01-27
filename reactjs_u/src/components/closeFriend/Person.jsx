import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { getFriendStatusRoute, sendFriendRequestRoute } from "../../utils/ApiRoutes";
import "./closeFriend.css";

export default function Person({person}) {
  const { isLoading, token, user } = useContext(AuthContext);

  const [friendStatus, setFriendStatus] = useState(null);
  
  const handleClick = async () => {
    console.log("------user ----- "+user);

    try {
      const res = await axios.post(
        sendFriendRequestRoute, 
        {
        "recipientId": person._id,
        "test": user._id,
        },
        {
        headers: {
          Authorization: `token ${token}`,
        },

      });
      console.log(res.data);
      setFriendStatus(res.data);
    } catch (err) {
      console.log(err);
    }
  }

    const getFriendStatus = async () => {
        try {
          const res = await axios.post(getFriendStatusRoute, {
            "personId": person._id,
          }, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          setFriendStatus(res.data.friendStatus.status);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        if(person) {
          getFriendStatus();
        }
      }, []);
      
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={person.profilePicture} alt="" />
      <span className="sidebarFriendName">{person.username}</span>

      {!isLoading &&friendStatus === null && <Button onClick={handleClick}>Add Friend</Button>}
      {friendStatus === 1 && <Button>Pending</Button>}
      {friendStatus === 3 && <Button color="success">Friends</Button>}
    </li>

  );
}