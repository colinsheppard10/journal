import { OAuth2Client, TokenPayload } from "google-auth-library";
import { createUserFromGoogle, getUser } from "./userController";
import { User } from "../entity/User";

const clientId = process.env.GOOGLE_CLIENT_ID ?? "";
const client = new OAuth2Client(clientId);

// Authenticate the user using the bearer token
export const verifyTokenGoogle = async (token): Promise<TokenPayload> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    return ticket.getPayload();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyTokenEmail = async (token): Promise<User> => {
  try {
    return await getUser({ column: "journalAuthTokenEmail", value: token });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authMiddleware = async (req, res, next) => {
  const { journalauthtokengoogle, journalauthtokenemail } = req.headers;

  if (journalauthtokengoogle) {
    const tokenPayload = await verifyTokenGoogle(journalauthtokengoogle);
    if (tokenPayload) {
      let email = tokenPayload.email;
      let user = await getUser({ column: "email", value: email });
      if (!user) user = await createUserFromGoogle({ tokenPayload });
      delete user.password;
      req["user"] = user;
    }
  } else if (journalauthtokenemail) {
    const user = await verifyTokenEmail(journalauthtokenemail);
    if (user) {
      delete user.password;
      req["user"] = user;
    } else {
      return res.status(401).send("Unauthorized");
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
  next();
};
