const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");
const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Aditya Ganguly" <2005916@kiit.ac.in>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
