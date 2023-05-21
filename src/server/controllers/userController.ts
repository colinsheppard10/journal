import { TokenPayload } from "google-auth-library";
import { User } from "../entity/User";
import { v4 as uuid } from "uuid";
import { VerifyEmail } from "../entity/VerifyEmail";
import { ResetPassword } from "../entity/ResetPassword";

export const getUser = async ({ column, value }) => {
  try {
    let user = await User.createQueryBuilder("user")
      .where(`user.${column} = :value`, { value })
      .getOne();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserAndReset = async ({ column, value }) => {
  try {
    let user = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.resetPasswords", "r")
      .where(`user.${column} = :value`, { value })
      .getOne();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getVerifyEmail = async ({ column, value }) => {
  try {
    let verifyEmail = await VerifyEmail.createQueryBuilder("verifyEmail")
      .leftJoinAndSelect("verifyEmail.user", "u")
      .where(`verifyEmail.${column} = :value`, { value })
      .getOne();
    return verifyEmail;
  } catch (error) {
    console.log(error);
  }
};

export const getResetPassword = async ({ column, value }) => {
  try {
    let resetPassword = await ResetPassword.createQueryBuilder("resetPassword")
      .leftJoinAndSelect("resetPassword.user", "u")
      .where(`resetPassword.${column} = :value`, { value })
      .getOne();
    return resetPassword;
  } catch (error) {
    console.log(error);
  }
};

export const getUserEmailPassword = async ({ email, password }) => {
  try {
    let user = await User.createQueryBuilder("user")
      .where(`user.email = :email`, { email })
      .andWhere(`user.password = :password`, { password })
      .getOne();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUserFromGoogle = async ({
  tokenPayload,
}: {
  tokenPayload: TokenPayload;
}): Promise<User> => {
  try {
    let user = new User();
    user.firstName = tokenPayload.given_name;
    user.lastName = tokenPayload.family_name;
    user.fullName = tokenPayload.name;
    user.email = tokenPayload.email;
    user.picture = tokenPayload.picture;
    user.locale = tokenPayload.locale;
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUserFromEmail = async ({
  verifyEmail,
}: {
  verifyEmail: VerifyEmail;
}): Promise<User> => {
  try {
    let user = new User();
    user.firstName = verifyEmail.firstName;
    user.lastName = verifyEmail.lastName;
    user.fullName = verifyEmail.fullName;
    user.email = verifyEmail.email;
    user.password = verifyEmail.password;
    user.verifyEmail = verifyEmail;
    user.journalAuthTokenEmail = uuid();
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createVerifyEmail = async ({
  signUpPayload,
}: {
  signUpPayload: any;
}): Promise<VerifyEmail> => {
  try {
    let verifyEmail = new VerifyEmail();
    verifyEmail.firstName = signUpPayload.firstName;
    verifyEmail.lastName = signUpPayload.lastName;
    verifyEmail.fullName = `${signUpPayload.firstName} ${signUpPayload.lastName}`;
    verifyEmail.email = signUpPayload.email;
    verifyEmail.password = signUpPayload.password;
    await verifyEmail.save();
    return verifyEmail;
  } catch (error) {
    console.log(error);
  }
};
