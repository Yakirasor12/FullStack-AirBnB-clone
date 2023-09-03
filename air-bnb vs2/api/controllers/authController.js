const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const jwbSecret = process.env.JWT_SECRET;


// Register a new user
async function registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 0, 
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Log in user
async function loginUser(req, res) {
    const { email, password } = req.body;
    let newEmail = email.toLowerCase()
    const userDoc = await User.findOne({ email:newEmail })
    if (userDoc) {
        const passOK = bcrypt.compareSync(password, userDoc.password)
        if (passOK) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
                role:userDoc.role,
            }, jwbSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc)
            });
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.json('not found')
    };
}

// Get user profile
async function getUserProfile(req, res) {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwbSecret, {}, async (err, userData) => {
            if (err) throw err;
            const userDoc = await User.findById(userData.id);

            if (userDoc) {
                const { name, email, _id,role } = userDoc;
                res.json({ name, email, _id,role });
            } else {
                res.json(null);
            }
        });

}else{res.json(null)}
}

// Log out user
function logoutUser(req, res) {
    res.cookie('token', '').json(true)
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
};
