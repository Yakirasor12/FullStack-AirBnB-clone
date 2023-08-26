const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createBooking, getUserBookings } = require('../controllers/bookingController');

router.post('/', authMiddleware, createBooking);
router.get('/', authMiddleware, getUserBookings);

module.exports = router;
