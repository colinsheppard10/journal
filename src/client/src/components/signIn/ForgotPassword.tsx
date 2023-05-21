import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { JournalIcon } from "../styledComponents";
import { useState } from "react";
import { validateEmail } from "./SignUp";
import { forgotPassword, signUp } from "../../api/user";

export default function ForgotPassword() {
  const [input, setInput] = useState({
    email: "",
  });

  const [inputError, setInputError] = useState({
    email: "",
  });

  const [resetResponse, setResetResponse] = useState({
    resetComplete: false,
    message: "",
  });

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
    const { email } = input;

    let inputErrors = {
      email: "",
    };

    if (!validateEmail(email)) inputErrors.email = "valid email is required";
    setInputError(inputErrors);
    return Object.values(inputErrors).reduce((prev, value) => {
      if (!prev || value.length) return false;
      return true;
    }, true);
  };

  const afterReset = (response: any) => {
    const { success, message } = response?.data;
    if (success) {
      setResetResponse({ resetComplete: true, message });
    } else {
      setResetResponse({ resetComplete: false, message });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInput()) {
      forgotPassword({
        payload: input,
        callback: afterReset,
      });
    }
  };

  const { email } = inputError;
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
              Check Your Email
            </Typography>
            <Typography align="center" variant="subtitle2" gutterBottom>
              {message}
            </Typography>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Reset your password
            </Typography>
            <Typography align="center" variant="subtitle2" gutterBottom>
              Enter your email address and we will send you instructions to
              reset your password.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={email}
                error={email.length > 0}
                onChange={(e) =>
                  updateInput({
                    input: { email: e.target.value },
                    inputError: { email: "" },
                  })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 2 }}
              >
                Send Reset
              </Button>
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
