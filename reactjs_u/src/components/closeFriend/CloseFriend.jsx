import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import CustomAvatar from "../avatar/CustomAvatar";
import "./closeFriend.css";
export default function CloseFriend({user}) {
  return (
    <Link className="sidebarFriend" to={`/profile/${user._id}`}>
      <CustomAvatar name={user.username} />
      {/* <img className="sidebarFriendImg" src={user.profilePicture} alt="" /> */}
      <span className="sidebarFriendName">{user.username}</span>
    </Link>
  );
}