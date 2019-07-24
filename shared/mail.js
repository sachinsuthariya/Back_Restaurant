const nodemailer = require("nodemailer");


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
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}