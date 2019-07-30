require('dotenv').config();

const BranchModel = require("../models/branchRestaurant");



exports.addBranch = function (req, res) {

    const BranchData = new BranchModel(req.body);

    BranchModel.create(BranchData, function (err, Branch) {
        if (err) {
            return res.json({
                success: false,
                message: "Error in adding restaurant",
                error: err
            });
        }
        return res.json({
            success: true,
            message: "Restaurant added successfully",
        });
    });

}

exports.getBranchList = function (req, res) {
    BranchModel.find({
        "restaurantID": req.body.RestaurantId
    }, function (err, branchList) {
        if (err) {
            return res.json({
                success: false,
                message: "Error in fatching Detail, please try agin",
                error: err
            });
        }
        return res.json({
            success: true,
            body: branchList
        });
    })


}