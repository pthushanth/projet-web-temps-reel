import {
  CircularProgress,
  Divider,
  Fab,
  Grid,
  List,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import ChatInput from "./ChatInput";
import { getAllMessagesRoute, sendMessageRoute } from "../../utils/ApiRoutes";
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
      const messages = await axios.post(
        getAllMessagesRoute,
        {
          to: currentChat._id,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      return messages.data;
    };

    getMessages().then((res) => {
      setIsLoading(false);

      setMessages(res);
    });
  }, [setMessages, currentChat, user, token]);

  return (
    <>
      {isLoading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress size={100} sx={{ my: "auto" }} />
        </Box>
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
      )}
    </>
  );
}
