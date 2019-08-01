const jwt = require("jsonwebtoken");

require('dotenv').config();

exports.verifyToken = function (req, res, next) {
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