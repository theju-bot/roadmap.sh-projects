const verifyAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ Forbidden: 'Admins only' });
    }
};

module.exports = verifyAdmin;