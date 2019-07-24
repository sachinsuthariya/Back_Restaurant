// imports
const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");


const restaurantSchema = new mongoose.Schema({
    ownerName: String,
    restaurantName: String,
    city: String,
    address: String,
    username: String,
    password: String
});

restaurantSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Restaurant", restaurantSchema);