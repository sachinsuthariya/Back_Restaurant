//imports
const express = require("express"),
    router = express.Router();

const restaurantController = require("../controller/restaurant.controller"),
    branchRestaurantController = require("../controller/branchRestaurantController");

const menuController = require("../controller/menuController");

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
// const verifyToken = require("../shared/verifyToken");

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json("Unauthorized Request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token == "null") {
        return res.status(401).json("Unauthorized Request");
    }
    let payload = jwt.verify(token, process.env.SECRET_KEY);
    if (!payload) {
        return res.status(401).json("Unauthorized Request");
    }
    req.userId = payload.subject;
    req.userName = payload.subject;
    next();
}

//auth and get restaurant
router.post("/register", restaurantController.SignUp);
router.post("/login", restaurantController.SignIn);
router.get("/getRestaurant", restaurantController.getRestaurant);


// restaurant branch
router.post("/addBranch", branchRestaurantController.addBranch);
router.post("/getBranchList", branchRestaurantController.getBranchList);
router.put("/updateBranch", branchRestaurantController.updateBranch);

//menu management
router.post("/addMenu", menuController.AddMenu);
router.get("/getMenu", menuController.GetMenu);

module.exports = router;