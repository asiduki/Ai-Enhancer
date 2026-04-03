const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  googleId: { type: String },
  githubId: { type: String },
  password: { type: String, required: false }, 
});

module.exports = mongoose.model("User", UserSchema);
