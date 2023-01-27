import { Fab, Grid, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useEffect } from "react";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const ChatInput = ({ handleSendMessage }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const handleInputFoucus = () => {
    setShowEmojiPicker(false);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };

  const handleMsgChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <Grid container style={{ padding: "20px" }}>
      <Grid item xs={10}>
        <TextField
          onChange={handleMsgChange}
          onFocus={handleInputFoucus}
          value={msg}
          id="msg"
          label="Type Something"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ zIndex: 100, color: "#ffcc33", cursor: "pointer" }}
              >
                <EmojiEmotionsIcon onClick={handleEmojiPickerShow} />
              </InputAdornment>
            ),
          }}
        />
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} preload />}
      </Grid>
      <Grid item xs={1} align="right"></Grid>
      <Grid item xs={1} align="right">
        <Fab color="primary" aria-label="add">
          <SendIcon onClick={handleSendChat} />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default ChatInput;
