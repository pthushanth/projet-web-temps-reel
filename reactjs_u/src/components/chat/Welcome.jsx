import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Welcome() {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        // async function getUsernameFromLocalStorage() {
        //     await JSON.parse(
        //         localStorage.getItem(localStorage.getItem('app-user'))
        //       ).username
        //   }
          setUserName(JSON.parse(localStorage.getItem(localStorage.getItem('app-user'))));
        
    }, []);

  return (
    <Paper>
      <img src="" alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Paper>
  )
}
