import { Router } from "express";
import {
  sendEmail,
  sendPasswordResetEmail,
} from "../controllers/emailController";
import {
  createUserFromEmail,
  createVerifyEmail,
  getResetPassword,
  getUser,
  getUserAndReset,
  getUserEmailPassword,
  getVerifyEmail,
} from "../controllers/userController";
import { ResetPassword } from "../entity/ResetPassword";
import { v4 as uuidGen } from "uuid";
import computationRoutes from "./computation/computationRoutes";

const router = Router();

router.post("/signin", async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(`email${email} password:${password}`);
    const user = await getUserEmailPassword({ email, password });
    if (user) {
      delete user.password;
      res.json({
        success: true,
        message: "ok",
        token: user.journalAuthTokenEmail,
        user,
      });
    } else {
      res.json({
        success: false,
        message: "Incorrect Email or Password",
        token: "",
      });
    }
  } catch (error) {
    return res.status(504).send({ error });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    let [user, verifyEmail] = await Promise.all([
      getUser({ column: "email", value: email }),
      getVerifyEmail({ column: "email", value: email }),
    ]);
    if (user) {
      return res.json({
        success: false,
        message: "A user already exists with this email address",
        token: "",
      });
    } else if (verifyEmail) {
      return res.json({
        success: false,
        message:
          "An email verification link has already been sent to this email",
        token: "",
      });
    } else {
      verifyEmail = await createVerifyEmail({ signUpPayload: req.body });
      await sendEmail({
        email: verifyEmail.email,
        verifyUuid: verifyEmail.id,
      });
      return res.json({
        success: true,
        message: `A verification email has been sent to ${verifyEmail.email}. Please verify your email to continue.`,
        token: "",
      });
    }
  } catch (error) {
    return res.status(504).send({ error });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { uuid } = req.body;
    let verifyEmail = await getVerifyEmail({ column: "id", value: uuid });
    let user = verifyEmail?.user;
    if (!verifyEmail) {
      return res.json({
        success: false,
        message: "An error occurred while validating your email address. Please restart from the signup page.",
        token: "",
      });
    } else {
      if(user) {
        return res.json({
          success: false,
          message: "This email address has already been validated. Please sign in using your email address and password.",
          token: "",
        });
      }
      user = await createUserFromEmail({ verifyEmail });
      return res.json({
        success: true,
        message: "Please sign in using your email address and password.",
        token: user.journalAuthTokenEmail,
        user
      });
    }
  } catch (error) {
    return res.status(504).send({ error });
  }
});

router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;
    let user = await getUserAndReset({ column: "email", value: email });
    let resetPassword = user?.resetPasswords?.find((resetPasswords) => resetPasswords.validResetLink === true);
    let genericResponse = {
      success: true,
      message: `Please check the email address ${email} for instructions to reset your password.`,
    };
    if (!user) {
      return res.json(genericResponse);
    }

    if (!resetPassword) resetPassword = new ResetPassword();
    resetPassword.numberOfResets = (resetPassword.numberOfResets ?? 0) + 1;
    resetPassword.user = user;

    if (resetPassword.numberOfResets > 20) {
      return res.json(genericResponse);
    }

    await sendPasswordResetEmail({
      email,
      resetUuid: resetPassword.id,
    });
    await resetPassword.save()
    return res.json(genericResponse);
  } catch (error) {
    return res.status(504).send({ error });
  }
});

router.post("/reset", async (req, res) => {
  try {
    const { uuid, password } = req.body;
    let resetPassword = await getResetPassword({ column: "id", value: uuid });
    let user = resetPassword?.user;
    if (!resetPassword || !user) {
      return res.json({
        success: false,
        message:
          "An error occurred while resetting your password. Please restart from the signup page.",
        token: "",
      });
    }
    resetPassword.validResetLink = false;
    user.password = password;
    user.journalAuthTokenEmail = uuidGen();
    await Promise.all([
      user.save(),
      resetPassword.save()
    ])
    return res.json({
      success: true,
      message: "Your password has been rest. Redirecting you to app...",
      token: user.journalAuthTokenEmail,
      user,
    });
  } catch (error) {
    return res.status(504).send({ error });
  }
});

// All routes here are for the computation app
router.use('/computation', computationRoutes);

export default router;
