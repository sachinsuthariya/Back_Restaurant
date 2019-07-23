//imports
var express = require("express"),
    passport = require("passport"),
    router = express.Router();

var restaurant = require("../models/restaurant");


router.get("/", function (req, res) {
    res.send("hay i m from restaurant router");
});

router.post("/register", function (req, res) {
    
});


module.exports = router;