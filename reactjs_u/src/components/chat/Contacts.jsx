import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Contacts({ contacts, onChatChange }) {
  const [currentSelected, setCurrentSelected] = useState(null);

  const handleChatChange = (index, contact) => {
    setCurrentSelected(index);
    onChatChange(contact);
  };
  useEffect(() => {
    console.log("contacts", contacts);
  }, [contacts]);
  return (
    <List>
      {contacts.map((contact, index) => {
        return (
          <ListItemButton
            key={contact._id}
            onClick={() => handleChatChange(index, contact)}
            selected={currentSelected === index}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <ListItemIcon>
              <Avatar
                src={
                  "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff"
                }
              />
            </ListItemIcon>
            <ListItemText primary={contact.username} />
          </ListItemButton>
        );
      })}
    </List>
  );
}
