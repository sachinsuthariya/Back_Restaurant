// imports
const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),
    bcrypt = require("bcrypt");


const restaurantSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        min: 6,
        max: 18,
        required: true
    },
    isadmin: {
        type: Boolean,
        default: false
    }
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