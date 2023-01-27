import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

export default function ChatList({handleChangeChat,chat, participant}) {
  return (
    <ListItem onClick={() => handleChangeChat(chat)} sx={{'&:hover':{"cursor":"pointer"}}}>
        <ListItemIcon>
            <Avatar src={participant.avatar} />
        </ListItemIcon>
        <ListItemText primary={participant.name} />
    </ListItem>
  )
}
