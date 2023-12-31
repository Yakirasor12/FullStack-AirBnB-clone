require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const { connectDatabase } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();
// app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;

//Connect to Database
connectDatabase();


// Middleware and other configurations
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(
    cors({
        credentials: true,
        origin: 'http://127.0.0.1:5173',
    })
);



// Include routes
const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/placeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes'); 

app.use('/api', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






