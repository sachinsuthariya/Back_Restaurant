const nodemailer = require("nodemailer");

require('dotenv').config();

exports.Mail = function (toEmail, subject, message) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "sachin.suthariya.sa@gmail.com",
            pass: "ZxzxErHUpqFw"
        }
    });

    var mailOptions = {
        from: "sachin.suthariya.sa@gmail.com",
        to: toEmail,
        subject: subject,
        text: message
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        } else {
            // console.log('Email sent: ' + info.response);
            return info.response;
        }

    });
    return true;
}