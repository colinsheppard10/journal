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
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
const userController_1 = require("../controllers/userController");
const ResetPassword_1 = require("../entity/ResetPassword");
const uuid_1 = require("uuid");
const computationRoutes_1 = require("./computation/computationRoutes");
const router = (0, express_1.Router)();
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        console.log(`email${email} password:${password}`);
        const user = yield (0, userController_1.getUserEmailPassword)({ email, password });
        if (user) {
            delete user.password;
            res.json({
                success: true,
                message: "ok",
                token: user.journalAuthTokenEmail,
                user,
            });
        }
        else {
            res.json({
                success: false,
                message: "Incorrect Email or Password",
                token: "",
            });
        }
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        let [user, verifyEmail] = yield Promise.all([
            (0, userController_1.getUser)({ column: "email", value: email }),
            (0, userController_1.getVerifyEmail)({ column: "email", value: email }),
        ]);
        if (user) {
            return res.json({
                success: false,
                message: "A user already exists with this email address",
                token: "",
            });
        }
        else if (verifyEmail) {
            return res.json({
                success: false,
                message: "An email verification link has already been sent to this email",
                token: "",
            });
        }
        else {
            verifyEmail = yield (0, userController_1.createVerifyEmail)({ signUpPayload: req.body });
            yield (0, emailController_1.sendEmail)({
                email: verifyEmail.email,
                verifyUuid: verifyEmail.id,
            });
            return res.json({
                success: true,
                message: `A verification email has been sent to ${verifyEmail.email}. Please verify your email to continue.`,
                token: "",
            });
        }
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
router.post("/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uuid } = req.body;
        let verifyEmail = yield (0, userController_1.getVerifyEmail)({ column: "id", value: uuid });
        let user = verifyEmail === null || verifyEmail === void 0 ? void 0 : verifyEmail.user;
        if (!verifyEmail) {
            return res.json({
                success: false,
                message: "An error occurred while validating your email address. Please restart from the signup page.",
                token: "",
            });
        }
        else {
            if (user) {
                return res.json({
                    success: false,
                    message: "This email address has already been validated. Please sign in using your email address and password.",
                    token: "",
                });
            }
            user = yield (0, userController_1.createUserFromEmail)({ verifyEmail });
            return res.json({
                success: true,
                message: "Please sign in using your email address and password.",
                token: user.journalAuthTokenEmail,
                user
            });
        }
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
router.post("/forgot", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { email } = req.body;
        let user = yield (0, userController_1.getUserAndReset)({ column: "email", value: email });
        let resetPassword = (_a = user === null || user === void 0 ? void 0 : user.resetPasswords) === null || _a === void 0 ? void 0 : _a.find((resetPasswords) => resetPasswords.validResetLink === true);
        let genericResponse = {
            success: true,
            message: `Please check the email address ${email} for instructions to reset your password.`,
        };
        if (!user) {
            return res.json(genericResponse);
        }
        if (!resetPassword)
            resetPassword = new ResetPassword_1.ResetPassword();
        resetPassword.numberOfResets = ((_b = resetPassword.numberOfResets) !== null && _b !== void 0 ? _b : 0) + 1;
        resetPassword.user = user;
        if (resetPassword.numberOfResets > 20) {
            return res.json(genericResponse);
        }
        yield (0, emailController_1.sendPasswordResetEmail)({
            email,
            resetUuid: resetPassword.id,
        });
        yield resetPassword.save();
        return res.json(genericResponse);
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
router.post("/reset", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uuid, password } = req.body;
        let resetPassword = yield (0, userController_1.getResetPassword)({ column: "id", value: uuid });
        let user = resetPassword === null || resetPassword === void 0 ? void 0 : resetPassword.user;
        if (!resetPassword || !user) {
            return res.json({
                success: false,
                message: "An error occurred while resetting your password. Please restart from the signup page.",
                token: "",
            });
        }
        resetPassword.validResetLink = false;
        user.password = password;
        user.journalAuthTokenEmail = (0, uuid_1.v4)();
        yield Promise.all([
            user.save(),
            resetPassword.save()
        ]);
        return res.json({
            success: true,
            message: "Your password has been rest. Redirecting you to app...",
            token: user.journalAuthTokenEmail,
            user,
        });
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
// All routes here are for the computation app
router.use('/computation', computationRoutes_1.default);
exports.default = router;
//# sourceMappingURL=publicRoutes.js.map