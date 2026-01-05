const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    name: { type: String, default: 'unknown' },
    password: { type: String, required: true, minlength: 6 },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);