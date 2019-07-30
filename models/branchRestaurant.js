// imports
const mongoose = require("mongoose");


const restBranchSchema = new mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    Parent_Rest: String,
    ownerName: String,
    restaurantName: String,
    city: String,
    address: String,
    email: String,
    mobile: String
});

module.exports = mongoose.model("restBranchSchema", restBranchSchema);