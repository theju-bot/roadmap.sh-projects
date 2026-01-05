const mongoose = require('mongoose');
const { Schema } = mongoose;

const prodctSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', prodctSchema);