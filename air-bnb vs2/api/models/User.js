const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const joi = require('joi'); // Import Joi

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0, 
    },
});

// Add a static method for user validation using Joi
userSchema.statics.validateUser = function (user) {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        // Add other validation rules here
    });

    return schema.validate(user);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
