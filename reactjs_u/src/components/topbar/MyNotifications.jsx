import { Notifications } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { accepteFriendRequestRoute, getAllFriendRequestsRoute, rejectFriendRequestRoute } from "../../utils/ApiRoutes";

const MyNotifications = () => {

  const {user,token} = useContext(AuthContext);
  const [friendRequests, setFriendRequests] = useState([]);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const getAllFriendRequests = async () => {
      try {
        const res = await axios.get(getAllFriendRequestsRoute, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        console.log(res.data.requests);
        setFriendRequests(res.data.requests);
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      if (token) {
        getAllFriendRequests();
      }
    }, []);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const acceptFriendRequest = async (friendRequestId) => {
      try {
        const res = await axios.post(
          accepteFriendRequestRoute,
          {
            "requesterId": friendRequestId,
          },
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        console.log(res.data);
        getAllFriendRequests();
      } catch (err) {
        console.log(err);
      }
    }

    const declineFriendRequest = async (friendRequestId) => {
      try {
        const res = await axios.post(
          rejectFriendRequestRoute,
          {
            "requesterId": friendRequestId,
          },
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        console.log(res.data);
        getAllFriendRequests();
      } catch (err) {
        console.log(err);
      }
    }

    const handleAccept = async (friendId) => {
      await acceptFriendRequest(friendId);
      handleClose();
    }

    const handleReject = async(friendId) => {
      await declineFriendRequest(friendId);
      handleClose();
    }
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Notifications />
          <span className="topbarIconBadge">{friendRequests.length}</span>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {friendRequests &&
          friendRequests.length > 0 &&
          friendRequests.map((request) => (
            <MenuItem key={request._id}>
              <span className="friendRequestName">{request.username}</span>
              <Button variant="contained" color="success" size="small" onClick={()=>handleAccept(request._id)}>
                Accept
              </Button>
              <Button variant="contained" color="error" size="small" onClick={()=>handleReject(request._id)}>
                Reject
              </Button>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default MyNotifications;
