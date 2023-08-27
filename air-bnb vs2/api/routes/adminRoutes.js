const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');




router.get('/users', authMiddleware, isAdmin, adminController.getAllUsers);
router.put('/update/:userId', authMiddleware, isAdmin, adminController.updateUser);
router.delete('/:userId', authMiddleware, isAdmin, adminController.deleteUser);

module.exports = router;
