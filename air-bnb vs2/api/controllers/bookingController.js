const Booking = require('../models/Booking');
const { getUserDataFromReq } = require('../utils/authUtils'); 

exports.createBooking = async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
        place, checkIn, checkOut,
        numberOfGuests, name, phone, price
    } = req.body
    Booking.create({
        place, checkIn, checkOut,
        numberOfGuests, name, phone, price,
        user: userData.id
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err
    })
};

exports.getUserBookings = async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'))
};
