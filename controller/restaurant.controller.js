const mailer = require("../shared/mail"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt");

require('dotenv').config();

const restaurantModel = require("../models/restaurant");

const SECRET_KEY = process.env.SECRET_KEY;

exports.SignUp = function (req, res) {

    const password = "123456";

    const newRestaurant = new restaurantModel({
        username: req.body.email,
        ownerName: req.body.ownerName,
        restaurantName: req.body.restaurantName,
        city: req.body.city,
        address: req.body.address,
        password: password
    });

    restaurantModel.create(newRestaurant, function (err, restaurant) {
        try {
            if (err) {
                return res.json({
                    success: false,
                    message: "Regitration failed",
                    error: err
                });
            }

            let payload = {
                subject: restaurant._id
            };
            let token = jwt.sign(payload, SECRET_KEY);

            let subject = "Welcome to Restaurant Management System";
            let message = "username: " + newRestaurant.username + " password: " + password;
            const mail = mailer.Mail(newRestaurant.username, subject, message);

            return res.json({
                success: true,
                message: "Registration Successfull, please check your email for credential",
                body: [{
                    token: token,
                    mail: mail
                }]
            });

        } catch (error) {
            return res.json({
                error: error
            });
        }
    });
}

exports.SignIn = function (req, res) {
    let loginData = req.body;

    restaurantModel.findOne({
        username: loginData.email
    }, function (err, restaurant) {

        if (err) {
            return res.json({
                success: false,
                message: "Authentication failed",
                error: err
            });
        } else
        if (!restaurant) {
            return res.json({
                success: false,
                message: "Invalid username",
                error: err
            });
        } else
        if (!bcrypt.compareSync(loginData.password, restaurant.password)) {

            return res.json({
                success: false,
                message: "Invalid password",
                error: err
            });
        } else {

            let payload = {
                subject: restaurant._id
            };
            let token = jwt.sign(payload, SECRET_KEY);

            return res.json({
                success: true,
                message: "Authentication successful",
                body: [{
                    token: token
                }]
            });
        }
    })

}