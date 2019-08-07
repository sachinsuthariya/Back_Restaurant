const express = require("express");
const app = express();
const menuModel = require("../models/menu");
const multer = require("multer");

// app.use(express.static(__dirname, 'public'));

exports.AddMenu = function addMenu(req, res) {
    let MenuData = {
        restaurantId: req.body.restaurantId,
        item: req.body.item,
        price: req.body.price,
        category: req.body.category
    }

    // const file = req.body.image;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname)
        },
        filename: function (req, file, cb) {
            cd(null, file.fieldname + "_" + Date.now())
        }
    });
    var upload = multer({
        storage: storage
    });

    console.log("data from add menu api", MenuData, req.body.image);

    return;
    menuModel.create(req.body, function (err, menu) {
        if (err) {
            return res.json({
                success: false,
                message: "Error in add menu item",
                body: err
            });
        }
        return res.json({
            success: true,
            message: "Menu Item added successfully",
            body: menu
        });
    });
}

exports.GetMenu = function getMenu(req, res) {
    menuModel.find({}, function (err, menu) {
        if (err) {
            return res.json({
                success: false,
                message: "Error in fatching data. try again!",
                body: err
            });
        }
        return res.json({
            success: true,
            message: "Menu item fatched successfully",
            body: menu
        });
    });
}