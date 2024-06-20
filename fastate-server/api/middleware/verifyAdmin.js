const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await User.findOne(query);
    const isAdmin = user?.role == 'admin';
    if (!isAdmin) {
        return res.status(403).send({ message: "Access forbidden!" });
    }
    next();
}

module.exports = verifyAdmin;