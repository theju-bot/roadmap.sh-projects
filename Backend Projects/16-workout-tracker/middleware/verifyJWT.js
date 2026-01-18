const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/UsersWT");

const verifyJWT = (req, res, next) => {
    const token = req.cookies?.jwt;
    if (!token) { return res.status(401).json({ message: 'Unauthorized' }); }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) { return res.status(403).json({ message: 'Forbidden' }); }

        const user = await User.findById(decoded.uId).exec();
        if (!user) { return res.status(404).json({ message: 'User not Found' }); }

        req.user = user;
        next();
    });
};

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
