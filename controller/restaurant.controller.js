const mailer = require("../shared/mail"),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

const restaurantModel = require("../models/restaurant");

exports.SignUp = function (req, res) {

    const password = "123456";

    const newRestaurant = new restaurantModel({
        username: req.body.email,
        ownerName: req.body.ownerName,
        restaurantName: req.body.restaurantName,
        city: req.body.city,
        address: req.body.address
    });

    restaurantModel.register(newRestaurant, password, function (err, restaurant) {
        try {
            if (err) {
                return res.json({
                    success: false,
                    message: "Regitration failed",
                    error: err
                });
            }
            let subject = "Welcome to Restaurant Management System";
            let message = "username: " + newRestaurant.username + " password: " + password;
            mailer.Mail(newRestaurant.username, subject, message);
            return res.json({
                success: true,
                message: "Registration Successfull"
            });

        } catch (error) {
            return res.json({
                error: error
            });
        }
    });
}

exports.SignIn = function (req, res) {
    let loginData = {
        username: req.body.email,
        password: req.body.password
    };


}