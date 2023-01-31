import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Snackbar } from '@mui/material';
import { registerRoute } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const theme = createTheme();

export default function SignIn() {
  let navigate= useNavigate();
    const [errorMessage, setErrorMessage] = useState({
        open: false,
        message: ''
    })
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });


    const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidate = () => {
        const { firstname, lastname, username, email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            setErrorMessage({
                open:true,
                message:"Password and confirm password should be same."
            });
            return false;
          }
           if (username.length < 4) {
            setErrorMessage({
                open:true,
                message:"Username should be greater than 4 characters."
            });
            return false;
          }
           if (password.length < 8) {
            setErrorMessage({
                open:true,
                message:"Password should be equal or greater than 8 characters."
            });
            return false;
          }
           if (email === "") {
            setErrorMessage({
                open:true,
                message:"Email is required."
            });
            return false;
          }
      
          return true;
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidate()) {
        const { firstname, lastname, username, email, password } = values;
        const data = await fetch(registerRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname,
                lastname,
                username,
                email,
                password
            })
        })    

        if(data.status === 201) {  
          const user = await data.json()
          console.log(user);
          localStorage.setItem('app-user', JSON.stringify(user)); 
          navigate('/');

        }
        else {
          setErrorMessage({
            open:true,
            message:"Username already exists."
          });
        }
  };
}

  const handleErrorMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage({...errorMessage, open: false});
  };

  useEffect(() => {
    if (localStorage.getItem('app-user')) {
      navigate('/');
    }
  }
  , [navigate])

  return (
    <ThemeProvider theme={theme}>
            <Navbar/>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                id="firstname"
                label="First Name"
                autoFocus
                onChange={(e) => handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
                onChange={(e) => handleChange(e)}

              />
             <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e) => handleChange(e)}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => handleChange(e)}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirmPassword"
              onChange={(e) => handleChange(e)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          {errorMessage &&  <Snackbar open={errorMessage.open} autoHideDuration={10000} onClose={handleErrorMessageClose}>
            <Alert onClose={handleErrorMessageClose} severity="error" sx={{ width: '100%' }}>
            {errorMessage.message}
            </Alert>
      </Snackbar>
      }

        </Box>
      </Container>
    </ThemeProvider>
  );
}