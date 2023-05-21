import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyUser } from "../../api/user";
import { LoginStatus, UserContext } from "../../context/userContext";
import { CenterSpinnerPage, JournalIcon } from "../styledComponents";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Container from "@mui/material/Container/Container";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import Box from "@mui/material/Box/Box";

enum VerifyStatus {
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

const VerifyEmail = (props: any) => {
  let uuid = ''
  const params: any = new URLSearchParams(window.location.search); 
  for (const [key, value] of params) { 
    if(key === 'id') uuid = value
  }
  const userContext = useContext(UserContext);
  const [response, setResponse] = useState({
    status: VerifyStatus.LOADING,
    message: "",
  });
  const navigate = useNavigate();

  const afterVerify = (response: any) => {
    const { success, message, token, user } = response?.data;
    if (success && token) {
      setResponse({ status: VerifyStatus.SUCCESS, message: "" });
      localStorage.setItem("journalAuthTokenEmail", token);
      userContext.updateUserContext({
        ...user,
        loginStatus: LoginStatus.LOGGED_IN,
      });
      navigate("/");
    } else {
      setResponse({ status: VerifyStatus.ERROR, message });
    }
  };

  useEffect(() => {
    if (uuid) {
      verifyUser({
        payload: { uuid },
        callback: afterVerify,
      });
    }
  }, [uuid]);

  const { status, message } = response;

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
        {status === VerifyStatus.LOADING ? (
          <>
            <CenterSpinnerPage />
            <Typography sx={{ mt: 3 }} component="h1" variant="h5">
              Verifying Your Email Address!
            </Typography>
            <Typography align="center" variant="subtitle2" gutterBottom>
              {`One moment while we verify your email address`}
            </Typography>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 3 }} component="h1" variant="h5">
              Thank You For Signing Up!
            </Typography>
            <Typography align="center" variant="subtitle2" gutterBottom>
              {`${message}`}
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};
export default VerifyEmail;
