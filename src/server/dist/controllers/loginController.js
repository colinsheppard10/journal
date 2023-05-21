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
//Set up dependencies
const google_auth_library_1 = require("google-auth-library");
const CLIENT_ID = '509723462310-vbcect5nmqbhser954i779cd2ajpfnv6.apps.googleusercontent.com';
const client = new google_auth_library_1.OAuth2Client(CLIENT_ID); // Replace with your Client ID
//Verify the token
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, // Replace with your Client ID
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload);
    });
}
//# sourceMappingURL=loginController.js.map