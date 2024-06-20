"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerifyEmail = exports.createUserFromEmail = exports.createUserFromGoogle = exports.getUserEmailPassword = exports.getResetPassword = exports.getVerifyEmail = exports.getUserAndReset = exports.getUser = void 0;
const User_1 = require("../entity/User");
const uuid_1 = require("uuid");
const VerifyEmail_1 = require("../entity/VerifyEmail");
const ResetPassword_1 = require("../entity/ResetPassword");
const getUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ column, value }) {
    try {
        let user = yield User_1.User.createQueryBuilder("user")
            .where(`user.${column} = :value`, { value })
            .getOne();
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUser = getUser;
const getUserAndReset = (_a) => __awaiter(void 0, [_a], void 0, function* ({ column, value }) {
    try {
        let user = yield User_1.User.createQueryBuilder("user")
            .leftJoinAndSelect("user.resetPasswords", "r")
            .where(`user.${column} = :value`, { value })
            .getOne();
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserAndReset = getUserAndReset;
const getVerifyEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ column, value }) {
    try {
        let verifyEmail = yield VerifyEmail_1.VerifyEmail.createQueryBuilder("verifyEmail")
            .leftJoinAndSelect("verifyEmail.user", "u")
            .where(`verifyEmail.${column} = :value`, { value })
            .getOne();
        return verifyEmail;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getVerifyEmail = getVerifyEmail;
const getResetPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ column, value }) {
    try {
        let resetPassword = yield ResetPassword_1.ResetPassword.createQueryBuilder("resetPassword")
            .leftJoinAndSelect("resetPassword.user", "u")
            .where(`resetPassword.${column} = :value`, { value })
            .getOne();
        return resetPassword;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getResetPassword = getResetPassword;
const getUserEmailPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    try {
        let user = yield User_1.User.createQueryBuilder("user")
            .where(`user.email = :email`, { email })
            .andWhere(`user.password = :password`, { password })
            .getOne();
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserEmailPassword = getUserEmailPassword;
const createUserFromGoogle = (_a) => __awaiter(void 0, [_a], void 0, function* ({ tokenPayload, }) {
    try {
        let user = new User_1.User();
        user.firstName = tokenPayload.given_name;
        user.lastName = tokenPayload.family_name;
        user.fullName = tokenPayload.name;
        user.email = tokenPayload.email;
        user.picture = tokenPayload.picture;
        user.locale = tokenPayload.locale;
        yield user.save();
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUserFromGoogle = createUserFromGoogle;
const createUserFromEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ verifyEmail, }) {
    try {
        let user = new User_1.User();
        user.firstName = verifyEmail.firstName;
        user.lastName = verifyEmail.lastName;
        user.fullName = verifyEmail.fullName;
        user.email = verifyEmail.email;
        user.password = verifyEmail.password;
        user.verifyEmail = verifyEmail;
        user.journalAuthTokenEmail = (0, uuid_1.v4)();
        yield user.save();
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUserFromEmail = createUserFromEmail;
const createVerifyEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ signUpPayload, }) {
    try {
        let verifyEmail = new VerifyEmail_1.VerifyEmail();
        verifyEmail.firstName = signUpPayload.firstName;
        verifyEmail.lastName = signUpPayload.lastName;
        verifyEmail.fullName = `${signUpPayload.firstName} ${signUpPayload.lastName}`;
        verifyEmail.email = signUpPayload.email;
        verifyEmail.password = signUpPayload.password;
        yield verifyEmail.save();
        return verifyEmail;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createVerifyEmail = createVerifyEmail;
//# sourceMappingURL=userController.js.map