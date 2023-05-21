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
exports.sendPasswordResetEmail = exports.sendEmail = void 0;
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey((_a = process.env.SENDGRID_API_KEY) !== null && _a !== void 0 ? _a : "x");
const fromEmailAddress = process.env.SENDGRID_FROM_EMAIL;
const baseURL = process.env.BASE_URL;
const sendEmail = ({ email, verifyUuid }) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: email,
        from: fromEmailAddress,
        templateId: "d-84bf5ac028ed436ab04a54a57fd7565d",
        dynamic_template_data: {
            url: `${baseURL}/verify?id=${verifyUuid}`,
        },
    };
    try {
        // this works, comment out for now
        let response = yield sgMail.send(msg);
        // let response = 'ok'
        console.log(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmail = sendEmail;
const sendPasswordResetEmail = ({ email, resetUuid }) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: email,
        from: fromEmailAddress,
        templateId: "d-cd4246412e044d8fa43e0d5877cd27c4",
        dynamic_template_data: {
            url: `${baseURL}/reset?id=${resetUuid}`,
        },
    };
    try {
        // this works, comment out for now
        let response = yield sgMail.send(msg);
        // let response = 'ok'
        console.log(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
//# sourceMappingURL=emailController.js.map