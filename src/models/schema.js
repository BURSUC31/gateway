const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userID: { type: String, require: true },
    request: { type: String, require: true },
    counter: { type: Number, require: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
