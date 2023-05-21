import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./components/home";
import {
  LoginStatus,
  UserContext,
  UserContextWrapper,
} from "./context/userContext";
import { StyledSpinner } from "./components/styledComponents";
import { getUser } from "./api/user";
import SignInPage from "./components/signIn/SingnInPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignIn from "./components/signIn/SignIn";

// import { refreshGoogleToken } from "./components/login";

const App = () => {
  useEffect(() => {
    setInterval(() => {
      // refreshGoogleToken();
    }, 3 * 1000);
  });

  const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#3c5a80",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: "#e0fbfb",
        main: "#ffffff",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#3c5a80",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <UserContextWrapper>
        <AppInterior />
      </UserContextWrapper>
    </ThemeProvider>
  );
};

const AppInterior = () => {
  const userContext = useContext(UserContext);
  const [fetchedUser, setFetchedUser] = useState(false);

  console.log(`AppInterior loggedIn:${userContext.loginStatus}`);
  useEffect(() => {
    if (!fetchedUser) {
      getUser().then((user) => {
        if (user?.email) {
          userContext.updateUserContext({
            loginStatus: LoginStatus.LOGGED_IN,
            ...user,
          });
        } else {
          userContext.updateUserContext({
            loginStatus: LoginStatus.LOGGED_OUT,
          });
        }
      });
      setFetchedUser(true);
    }
  }, [fetchedUser]);

  if (!fetchedUser) return <StyledSpinner />;
  else if (userContext.loginStatus === LoginStatus.LOADING)
    return <StyledSpinner />;
  else if (userContext.loginStatus === LoginStatus.LOGGED_OUT)
    return <SignInPage />;
  else if (userContext.loginStatus === LoginStatus.LOGGED_IN) 
    return <Home />;
  else return <SignInPage />;
};

export default App;
