const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
    index: true,
  },
  last_name: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  age: Number,
  role: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((error) => next(error));
});

const User = mongoose.model(userCollection, userSchema);

module.exports = User;
