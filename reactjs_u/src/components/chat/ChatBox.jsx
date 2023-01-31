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
  const [discussion, setDiscussion] = useState([]);

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

    const hasDisuccsion = axios.get(discussionRoute + `/user/${currentChat.id}`).then((response) => {
      if (response.status === 200) {
        setDiscussion(response.data);
        return response.data;
      }
    }).catch((error) => {
      console.log(error);
      if(error.response.status === 404){
      return false;
      }
    });

    const getMessages = async (discussionId) => {
      let messages;

      axios.get(getAllMessagesRoute + `/${discussionId}/messages`
          ).then((response) => {
            if ( response.status=== 200) {
              messages = response.data.messages;
            }
            return messages;
          }).catch((error) => {
            console.log(error);
          })
    };

    hasDisuccsion.then((res) => {
      console.log("test",res);
      if (res) {
        console.log("test2",res);
        getMessages(discussion.id).then((res) => {
          setIsLoading(false);
          setMessages(res);
        });
      } else {
        setIsLoading(false);
        setCreateNewDiscussion(true);
      }
    });

    
  }, [setMessages, currentChat, user, token, setDiscussion, setCreateNewDiscussion]);

  const handleStartNewDiscussion = async() => {
    await axios.post(discussionRoute, {
       type: "private",
       name: "New Discussion",
       invitee: currentChat.id,
      })
      .then((response) => {
        console.log(response);
        setDiscussion(response.data);
        setCreateNewDiscussion(false);

      }).catch((error) => {
        console.log(error);
      });


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
