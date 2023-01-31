import {
  Button,
  CircularProgress,
  Divider,
  Fab,
  Grid,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import ChatInput from "./ChatInput";
import { discussionRoute, getAllMessagesRoute, sendMessageRoute } from "../../utils/ApiRoutes";
import axios from "axios";
import { AuthContext } from "../../context/Auth";
import { Box } from "@mui/system";

const classes = {
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
};

export default function ChatBox({ currentChat }) {
  const { token, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [createNewDiscussion, setCreateNewDiscussion] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (msg) => {
    await axios.post(
      sendMessageRoute,
      {
        to: currentChat._id,
        message: msg,
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    console.log(msg, msgs);
    setMessages(msgs);
  };

  useEffect(() => {
    setIsLoading(true);

    const getMessages = async () => {
      let messages;

      axios.get(getAllMessagesRoute + `/${currentChat.id}/messages`
          ).then((response) => {
            if ( response.status=== 200) {
              messages = response.data.messages;
            }
            return messages;
          }).catch((error) => {
            console.log(error);
            if (error.response.status === 404){
              messages = [];
              setCreateNewDiscussion(true);
            }
          });
    };

    getMessages().then((res) => {
      setIsLoading(false);
      if (res.length > 0) {
      setMessages(res);
      } else {
        setMessages([]);
      }

    });
  }, [setMessages, currentChat, user, token]);

  const handleStartNewDiscussion = async() => {
    await axios.post(discussionRoute, {
       type: "private",
       name: "New Discussion",
       invitee: currentChat.id,
      })

    setCreateNewDiscussion(false);

  };

  return (
    <>
      {isLoading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress size={100} sx={{ my: "auto" }} />
        </Box>
      ) : (
       createNewDiscussion ? (
        <Stack alignItems="center" justifyItems="center" justifySelf="center" justifyContent="center" spacing={2}>
         
        <Typography variant="h5" align="center">
          No messages yet. Start a new discussion.
        </Typography>
        <Divider />
        <Button variant="contained" color="secondary" onClick={handleStartNewDiscussion}>
          Start Discussion
        </Button>
        </Stack>
      ) : (
        <>
        <List style={classes.messageArea}>
          {messages.length > 0 &&
            messages.map((message, index) => (
              <MessageItem key={index} message={message} />
            ))}
        </List>

        <Divider />
        <ChatInput handleSendMessage={handleSendMessage} />
      </>
      )
        
      )}
    </>
  );
}
