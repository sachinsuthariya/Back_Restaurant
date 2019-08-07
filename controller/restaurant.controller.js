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
            restaurantName: req.body.resName,
            city: req.body.city,
            address: req.body.address,
            mobile: req.body.mobile,
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
                let message = "username: " + restaurant.username + " password: " + password;


                try {
                    mailer.Mail(restaurant.username, subject, message);
                } catch (err) {
                    console.log("email eoor log", err);

                }

                return res.json({
                    success: true,
                    message: "Registration Successfull, please check your email for credential",
                    body: [{
                        token: token
                    }]
                });

            } catch (error) {
                return res.json({
                    success: false,
                    message: "Regitration failed",
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
            }
            if (!restaurant.isadmin) {
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
                            isadmin: false,
                            token: token,
                            user: restaurant
                        }]
                    });
                }
            } else if (restaurant.isadmin) {
                if (restaurant.password === loginData.password) {

                    let payload = {
                        subject: restaurant._id
                    };
                    let token = jwt.sign(payload, SECRET_KEY);

                    return res.json({
                        success: true,
                        message: "Authentication successful",
                        body: [{
                            isadmin: true,
                            token: token,
                            user: restaurant
                        }]
                    });
                } else {
                    return res.json({
                        success: false,
                        message: "Invalid password",
                        error: err
                    });
                }
            }
        });

    }

    exports.getRestaurant = function (req, res) {
        restaurantModel.find({
            isadmin: false
        }, {
            _id: 1,
            ownerName: 1,
            restaurantName: 1,
            username: 1,
            city: 1
        }, function (err, restaurantData) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Try again",
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: "Restaurant Data fatch successfully",
                body: [restaurantData]
            });

        });
    }