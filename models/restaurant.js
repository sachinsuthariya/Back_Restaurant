// imports
const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),
    bcrypt = require("bcrypt");


const restaurantSchema = new mongoose.Schema({
    ownerName: String,
    restaurantName: String,
    city: String,
    address: String,
    username: String,
    password: String
});

restaurantSchema.pre('save', function (next) {
    var restaurant = this;
    bcrypt.hash(restaurant.password, 10, function (err, hash) {

        if (err) {
            return res.json({
                success: false,
                message: "Something went wrong",
                error: err
            });
        }
        restaurant.password = hash;
        next();
    })
});

restaurantSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Restaurant", restaurantSchema);