import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext, useEffect, useState } from "react";
import { resetPassword, signUp } from "../../api/user";
import { JournalIcon } from "../styledComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginStatus, UserContext } from "../../context/userContext";

export default function SignUp() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [input, setInput] = useState({
    password: "",
    passwordConfirm: "",
    uuid: "",
  });

  const [inputError, setInputError] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [resetResponse, setResetResponse] = useState({
    resetComplete: false,
    message: "",
  });

  let uuid = ''
  const params: any = new URLSearchParams(window.location.search); 
  for (const [key, value] of params) { 
    if(key === 'id') uuid = value
  }

  useEffect(() => {
    updateInput({ input: { uuid } });
  }, [uuid]);

  const updateInput = (value: any) => {
    const { input, inputError } = value;
    setInput((oldInput) => {
      return { ...oldInput, ...input };
    });

    setInputError((oldInputError) => {
      return { ...oldInputError, ...inputError };
    });
    setResetResponse({ resetComplete: false, message: "" });
  };

  const validateInput = () => {
    const { password, passwordConfirm } = input;

    let inputErrors = {
      password: "",
      passwordConfirm: "",
    };

    if (password.length < 8)
      inputErrors.password = "password must be at least 8 characters long";
    if (!password || !passwordConfirm || password !== passwordConfirm)
      inputErrors.password = "password and confirmation must match";
    setInputError(inputErrors);
    return Object.values(inputErrors).reduce((prev, value) => {
      if (!prev || value.length) return false;
      return true;
    }, true);
  };

  const afterReset = (response: any) => {
    const { success, message, token, user } = response?.data;
    debugger;
    if (success) {
      setResetResponse({ resetComplete: true, message });
      setTimeout(() => {
        localStorage.setItem("journalAuthTokenEmail", token);
        userContext.updateUserContext({
          ...user,
          loginStatus: LoginStatus.LOGGED_IN,
        });
        navigate("/");
      }, 2000);
    } else {
      setResetResponse({ resetComplete: false, message });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInput()) {
      resetPassword({
        payload: input,
        callback: afterReset,
      });
    }
  };

  const { password, passwordConfirm } = inputError;
  const { message, resetComplete } = resetResponse;
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
        {resetComplete ? (
          <>
            <Typography sx={{ mt: 3 }} component="h1" variant="h5">
              Reset Password Complete
            </Typography>
            <Typography align="center" variant="subtitle2" gutterBottom>
              {message}
            </Typography>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    helperText={password}
                    error={password.length > 0}
                    onChange={(e) =>
                      updateInput({
                        input: { password: e.target.value },
                        inputError: { password: "" },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="password confirm"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    helperText={passwordConfirm}
                    error={passwordConfirm.length > 0}
                    onChange={(e) =>
                      updateInput({
                        input: { passwordConfirm: e.target.value },
                        inputError: { passwordConfirm: "" },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 2 }}
              >
                Reset Password
              </Button>
              <Typography color="darkred" align="center" variant="subtitle2">
                {message}
              </Typography>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Back to Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
