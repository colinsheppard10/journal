import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import Reset from "./ResetPassword";
import ResetPassword from "./ResetPassword";

export default function SignInPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
