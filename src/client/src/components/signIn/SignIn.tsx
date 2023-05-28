import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { ReactComponent as GoogleIcon } from "../../static/google.svg";
import { Link as RouterLink } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginStatus, UserContext } from "../../context/userContext";
import { signIn } from "../../api/user";
import { JournalIcon } from "../styledComponents";

export default function SignIn() {
  const userContext = useContext(UserContext);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loginResponse, setLoginResponse] = useState("");

  const updateInput = (value: any) => {
    setInput((input) => {
      return { ...input, ...value };
    });
    setLoginResponse("");
  };

  const afterSignIn = (response: any) => {
    console.log(response);
    const { success, message, token, user } = response?.data;
    if (success && token) {
      localStorage.setItem("journalAuthTokenEmail", token);
      userContext.updateUserContext({ ...user, loginStatus: LoginStatus.LOGGED_IN });
    } else {
      setLoginResponse(message);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn({
      payload: input,
      callback: afterSignIn,
    });
  };

  return (
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
        <JournalIcon />
        <Typography
        color={'#5a5a5a'}
        component="h5" variant="h4">
          Bluebird Journal
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => updateInput({ email: e.target.value })}
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
            onChange={(e) => updateInput({ password: e.target.value })}
          />
          <Typography color="darkred" align="center" variant="subtitle2">
            {loginResponse}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signUp" variant="body2">
                {"Need an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* <Divider flexItem sx={{ mt: 3 }}>
          Or
        </Divider>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, p: 2 }}
          color="secondary"
        >
          <GoogleIcon
            style={{
              height: "2em",
              width: "2em",
              marginRight: "1em",
            }}
          />
          Sign In With Google
        </Button> */}
      </Box>
    </Container>
  );
}
