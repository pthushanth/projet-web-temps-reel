import { Grid, ListItem, ListItemText } from "@mui/material";
import React, { useEffect } from "react";

export default function MessageItem({ message }) {
  useEffect(() => {
    console.log("msg", message.message);
  }, []);
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText
            // align={message.sender._id === currentUser._id ? "right" : "left"}
            align={message.fromSelf ? "right" : "left"}
            primary={message.message}
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            // align={message.sender._id === currentUser._id ? "right" : "left"}
            align={message.fromSelf ? "right" : "left"}
            secondary={message.createdAt}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}
