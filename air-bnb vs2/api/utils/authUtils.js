const jwt = require('jsonwebtoken');
const jwbSecret = process.env.JWT_SECRET;

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwbSecret, {}, (err, userData) => {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }
        });
    });
}

module.exports = {
    getUserDataFromReq,
};
