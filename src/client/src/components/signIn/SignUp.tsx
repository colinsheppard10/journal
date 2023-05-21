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
import { useState } from "react";
import { signUp } from "../../api/user";
import { JournalIcon } from "../styledComponents";

export const validateEmail = (email: string) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default function SignUp() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    inputValidationMessage: "",
  });

  const [inputError, setInputError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [signUpResponse, setSignUpResponse] = useState({
    signUpComplete: false,
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
    setSignUpResponse({ signUpComplete: false, message: "" });
  };

  const validateInput = () => {
    const { firstName, lastName, email, password, passwordConfirm } = input;

    let inputErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };

    if (!firstName) inputErrors.firstName = "first name is required";
    if (!lastName) inputErrors.lastName = "last name is required";
    if (!validateEmail(email)) inputErrors.email = "valid email is required";
    if (password.length < 8)
      inputErrors.password = "password must be at least 8 characters long";
    if (!password || !passwordConfirm || password !== passwordConfirm)
      inputErrors.password = "passwords and password confirm must match";
    setInputError(inputErrors);
    return Object.values(inputErrors).reduce((prev, value) => {
      if (!prev || value.length) return false;
      return true;
    }, true);
  };

  const afterSignUp = (response: any) => {
    console.log(response);
    const { success, message } = response?.data;
    if (success) {
      setSignUpResponse({ signUpComplete: true, message });
    } else {
      setSignUpResponse({ signUpComplete: false, message });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInput()) {
      signUp({
        payload: input,
        callback: afterSignUp,
      });
    }
  };

  const { firstName, lastName, email, password, passwordConfirm } = inputError;
  const { message, signUpComplete } = signUpResponse;
  console.log(`signupComplete: ${JSON.stringify(signUpResponse)}`);
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
        {signUpComplete ? (
          <>
            <Typography sx={{ mt: 3 }} component="h1" variant="h5">
              Thank You For Signing Up!
            </Typography>
            <Typography align="center" variant="subtitle2" gutterBottom>
              {message}
            </Typography>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    helperText={firstName}
                    error={firstName.length > 0}
                    onChange={(e) =>
                      updateInput({
                        input: { firstName: e.target.value },
                        inputError: { firstName: "" },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    helperText={lastName}
                    error={lastName.length > 0}
                    onChange={(e) =>
                      updateInput({
                        input: { lastName: e.target.value },
                        inputError: { lastName: "" },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 2 }}
              >
                Sign Up
              </Button>
              <Typography color="darkred" align="center" variant="subtitle2">
                {message}
              </Typography>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
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
