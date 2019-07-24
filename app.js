// imports
const express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    cors = require("cors");

const dbConfig = require("./dbConfig");

const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// app use
app.use(methodOverride("_method"));
app.use(bodyparser.json());
app.use(cors(corsOptions));

//database connection 
mongoose
    .connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch(err => {
        console.log("Could not connect to MongoDB.");
        process.exit();
    });


//port 
const PORT = process.env.PORT || 5000;

//routes 
const restaurantRoutes = require("./router/restaurant");

app.use("/api/restaurant", restaurantRoutes);



app.get("/", function (req, res) {
    res.send("Test");
});

//port listen
app.listen(PORT, function () {
    console.log("Restaurant server started on:" + PORT);
});