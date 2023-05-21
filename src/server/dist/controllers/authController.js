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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.verifyTokenEmail = exports.verifyTokenGoogle = void 0;
const google_auth_library_1 = require("google-auth-library");
const userController_1 = require("./userController");
const clientId = (_a = process.env.GOOGLE_CLIENT_ID) !== null && _a !== void 0 ? _a : "";
const client = new google_auth_library_1.OAuth2Client(clientId);
// Authenticate the user using the bearer token
const verifyTokenGoogle = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });
        return ticket.getPayload();
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.verifyTokenGoogle = verifyTokenGoogle;
const verifyTokenEmail = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, userController_1.getUser)({ column: "journalAuthTokenEmail", value: token });
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.verifyTokenEmail = verifyTokenEmail;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { journalauthtokengoogle, journalauthtokenemail } = req.headers;
    if (journalauthtokengoogle) {
        const tokenPayload = yield (0, exports.verifyTokenGoogle)(journalauthtokengoogle);
        if (tokenPayload) {
            let email = tokenPayload.email;
            let user = yield (0, userController_1.getUser)({ column: "email", value: email });
            if (!user)
                user = yield (0, userController_1.createUserFromGoogle)({ tokenPayload });
            delete user.password;
            req["user"] = user;
        }
    }
    else if (journalauthtokenemail) {
        const user = yield (0, exports.verifyTokenEmail)(journalauthtokenemail);
        if (user) {
            delete user.password;
            req["user"] = user;
        }
        else {
            return res.status(401).send("Unauthorized");
        }
    }
    else {
        return res.status(401).send("Unauthorized");
    }
    next();
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authController.js.map