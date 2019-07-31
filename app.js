// imports
const express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    methodOverride = require("method-override"),
    cors = require("cors");

require('dotenv').config();

require("./dbConfig").connection;

const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// app use
app.use(methodOverride("_method"));
app.use(bodyparser.json());
app.use(cors(corsOptions));


//port 
const PORT = process.env.PORT || 5000;

//routes 
const restaurantRoutes = require("./router/restaurant");

app.use("/api/restaurant", restaurantRoutes);


//port listen
app.listen(PORT, function () {
    console.log("Restaurant server started on:" + PORT);
});