const jwt = require('jsonwebtoken');
const jwbSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, jwbSecret, {}, (err, userData) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.userData = userData;
        next();
    });
};
