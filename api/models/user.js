const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  createdAt: {type: Date, default: Date.now},
  username: {type: String, required: true},
  password: {type: String, required: true},
  results: {type: Array, default: []}
})

const User = mongoose.model("User", UserSchema);

module.exports = User;