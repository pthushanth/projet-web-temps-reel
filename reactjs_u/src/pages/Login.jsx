import React, { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";
import { loginRoute } from "../utils/ApiRoutes";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();
  const { user, isLoading, error, login } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState({
    open: false,
    message: "",
  });
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidate = () => {
    const { username, password } = values;
    if (username.length === "") {
      setErrorMessage({
        open: true,
        message: "Username is required.",
      });
    }
    if (password === "") {
      setErrorMessage({
        open: true,
        message: "password is required.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidate()) {
      const { username, password } = values;
      await login(username, password);
    }
  };

  const handleErrorMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage({ ...errorMessage, open: false });
  };

  useEffect(() => {
    if (error) {
      setErrorMessage({
        open: true,
        message: error,
      });
    }
  }, [error]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          {errorMessage && (
            <Snackbar
              open={errorMessage.open}
              autoHideDuration={10000}
              onClose={handleErrorMessageClose}
            >
              <Alert
                onClose={handleErrorMessageClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMessage.message}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
