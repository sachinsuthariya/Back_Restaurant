//imports
const express = require("express"),
    router = express.Router();

const restaurantController = require("../controller/restaurant.controller");

router.get("/", function (req, res) {
    res.send("hay i m from restaurant router");
});

router.post("/register", restaurantController.SignUp);
router.post("/login", restaurantController.SignIn);
router.get("/getRestaurant", restaurantController.getRestaurant);


module.exports = router;