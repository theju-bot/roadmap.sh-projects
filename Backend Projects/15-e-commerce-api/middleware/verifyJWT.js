const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");

const verifyJWT = (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) {
    return res.render("alert", {
      title: "Unauthorized",
      message: "No authentication token provided",
      details: "Please log in to continue.",
      type: "error",
      statusCode: 401,
      redirectUrl: "/auth",
      redirectDelay: 1,
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      res.clearCookie("jwt");
      return res.render("alert", {
        title: "Forbidden",
        message: "Invalid or expired token",
        details: "Your session has expired. Please log in again.",
        type: "error",
        statusCode: 403,
        redirectUrl: "/auth",
        redirectDelay: 1
      });
    }

    const user = await User.findById(decoded.uID).exec();
    if (!user) {
      res.clearCookie("jwt");
      return res.render("alert", {
        title: "User not found",
        message: "The account associated with this token no longer exists",
        details: "Please register or contact support.",
        type: "error",
        statusCode: 404,
        redirectUrl: "/auth",
        redirectDelay: 51,
      });
    }

    req.user = user;
    next();
  });
};

/* const verifyJWT = (req, res, next) => {
    const token = req.cookies?.jwt;
    if (!token) { return res.status(401).json({ message: 'Unauthorized' }); }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) { return res.status(403).json({ message: 'Forbidden' }); }

        const user = await User.findById(decoded.uID).exec();
        if (!user) { return res.status(404).json({ message: 'User not Found' }); }

        req.user = user;
        next();
    });
}; */

/* const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({message: 'Unauthorized'});
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        const user = await User.findById(decoded.uID).exec();
        if (!user) return res.status(404).json({ message: 'User not Found' });
        req.user = user;
        next();
    });
}; */

module.exports = verifyJWT;
