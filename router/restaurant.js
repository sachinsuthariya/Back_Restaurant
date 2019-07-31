//imports
const express = require("express"),
    router = express.Router();

const restaurantController = require("../controller/restaurant.controller"),
    branchRestaurantController = require("../controller/branchRestaurantController");


//auth and get restaurant
router.post("/register", restaurantController.SignUp);
router.post("/login", restaurantController.SignIn);
router.get("/getRestaurant", restaurantController.getRestaurant);


// restaurant branch
router.post("/addBranch", branchRestaurantController.addBranch);
router.post("/getBranchList", branchRestaurantController.getBranchList);
router.post("/updateBranch", branchRestaurantController.updateBranch);

module.exports = router;