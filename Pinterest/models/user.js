const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/Pinterest");

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Dp: {
    type: String, // Assuming Dp is a URL to the user's display picture
  },
  Posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Assuming you have a separate Post schema
    },
  ],
});

userSchema.plugin(plm);
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
