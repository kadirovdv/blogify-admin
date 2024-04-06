const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SEND_EMAIL_HOST,
    port: 25,
    /* secure: true, */ // true for 465, false for other ports
    auth: {
      user: process.env.SEND_EMAIL_USERNAME, // generated ethereal user
      pass: process.env.SEND_EMAIL_PASSWORD, // generated ethereal password
    },
  });

  const mailOptions = {
    from: "nozim qodirow <nozimqodirow@gmail.com>", // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    /* html: options.html */ // html body
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
