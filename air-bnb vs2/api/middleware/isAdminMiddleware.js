const isAdmin = (req, res, next) => {
    if (req.userData && req.userData.role === 1) {
        next(); 
    } else {
        res.status(403).json({ message: 'Access denied: You are not an admin.' });
    }
};

module.exports = isAdmin;
