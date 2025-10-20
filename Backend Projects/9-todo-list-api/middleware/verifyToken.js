const User = require('../model/User');

const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });
    const token = req.headers.authorization.split(' ')[1]; // ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."]
    const user = await User.findOne(token).exec();
    if (!user) return res.status(401).json({message: 'Unauthorized'});
    req.user = user;
    next();
};

module.exports = verifyToken;