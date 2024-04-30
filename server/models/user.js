const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isEmployee: { type: Boolean, default: false },
    isCaregiver: { type: Boolean, default: false },
    isResident: { type: Boolean, default: false },
    isSignedUp: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
});
const User = mongoose.model('User', userSchema);

module.exports = User;