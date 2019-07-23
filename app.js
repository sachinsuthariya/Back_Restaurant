// imports
var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");

//models
var restaurant = require("./models/restaurant");

//method override
app.use(methodOverride("_method"));

//database connection  string
mongoose.connect("mongodb://localhost/restaurant", {
    useNewUrlParser: true
});

//body parser
app.use(bodyparser.urlencoded({
    extended: true
}));

//routes 
var restaurantRoutes = require("./router/restaurant");

app.use("/api/restaurant", restaurantRoutes);

//port 
const PORT = process.env.PORT || 5000;

app.get("/", function (req, res) {
    res.send("Test");
});

//port listen
app.listen(PORT, function () {
    console.log("Restaurant server started on:" + PORT);
});