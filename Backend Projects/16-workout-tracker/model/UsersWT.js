const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersWTSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timeseries: true }
);

module.exports = mongoose.model('UsersWT', usersWTSchema);