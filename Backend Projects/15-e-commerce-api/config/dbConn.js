const mongoose = require('mongoose');

const connectDB = async (next) => {
  try {
    await mongoose.connect(process.env.DATABASE_URI),{
        useUnifiedTopology: true,
        useNewUrlParser: true
    };
  } catch (err) {
    console.log("Mongoose connection error: ",err);
    next(err);
  }
};

module.exports = connectDB;
