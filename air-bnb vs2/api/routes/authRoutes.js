const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');


// Define authentication routes
router.post('/register',  authController.registerUser); // Add the validation middleware here
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.get('/profile', authMiddleware, authController.getUserProfile);

module.exports = router;
