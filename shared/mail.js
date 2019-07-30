const nodemailer = require("nodemailer");

require('dotenv').config();

exports.Mail = function (toEmail, subject, message) {
    console.log("email", toEmail, "sub", subject, "msg", message, "inside emial function");

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTHOR_EMAIL,
            pass: process.env.AUTHOR_EMAIL_PASSWORD
        }
    });




    var mailOptions = {
        from: process.env.AUTHOR_EMAIL,
        to: toEmail,
        subject: subject,
        text: message
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        } else {
            return info.response;
        }

    });
}