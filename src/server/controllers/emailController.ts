// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");

console.log(process.env.SENDGRID_API_KEY)
sgMail.setApiKey(
  process.env.SENDGRID_API_KEY ??
    "x"
);

const fromEmailAddress = process.env.SENDGRID_FROM_EMAIL
const baseURL = process.env.BASE_URL
export const sendEmail = async ({ email, verifyUuid }) => {
  const msg = {
    to: email,
    from: fromEmailAddress, // Change to your verified sender
    templateId: "d-84bf5ac028ed436ab04a54a57fd7565d",
    dynamic_template_data: {
      url: `${baseURL}/verify?id=${verifyUuid}`,
    },
  };
  try {
    // this works, comment out for now
    let response = await sgMail.send(msg);
    // let response = 'ok'
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordResetEmail = async ({ email, resetUuid }) => {
  const msg = {
    to: email,
    from: fromEmailAddress, // Change to your verified sender
    templateId: "d-cd4246412e044d8fa43e0d5877cd27c4",
    dynamic_template_data: {
      url: `${baseURL}/reset?id=${resetUuid}`,
    },
  };
  try {
    // this works, comment out for now
    let response = await sgMail.send(msg);
    // let response = 'ok'
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
