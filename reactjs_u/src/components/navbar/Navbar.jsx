import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

export default function ButtonAppBar() {
  //  isauth 
  const isauth = false;
  const style ={
    color: 'blue',
    background:'white',
    textDecoration:'underline white'
  };
  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton

            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/"><Button style={{color :"white"}} activeStyle={{ color: 'red' }}>Moto</Button></Link>
          </Typography>
          
          <Link href="/chatbot"><Button style={style} activeStyle={{ color: 'red' }}>ChatBot</Button></Link>
          {isauth && (
            <><Link href="/profile"><Button style={style} activeStyle={{ color: 'red' }}>Profile</Button></Link></>
            )}
          {!isauth ? (
          <><Link href="/login"><Button style={style} activeStyle={{ color: 'red' }}>Login</Button></Link></>) : (
            <><Link href="/logout"><Button style={style} activeStyle={{ color: 'red' }}>Logout</Button></Link></>)
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}