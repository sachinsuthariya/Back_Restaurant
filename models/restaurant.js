// imports
var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");


var restaurantSchema = new mongoose.Schema({
    ownerName: String,
    restaurantName: String,
    city: String,
    address: String,
    email: String,
    password: String
});

restaurantSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Restaurant", restaurantSchema);