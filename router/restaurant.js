//imports
const express = require("express"),
    router = express.Router();

const restaurantController = require("../controller/restaurant.controller"),
    branchRestaurantController = require("../controller/branchRestaurantController");

router.get("/", function (req, res) {
    res.send("hay i m from restaurant router");
});

//auth and get restaurant
router.post("/register", restaurantController.SignUp);
router.post("/login", restaurantController.SignIn);
router.get("/getRestaurant", restaurantController.getRestaurant);


// restaurant branch
router.post("/addBranch", branchRestaurantController.addBranch);

module.exports = router;