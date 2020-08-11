import mongoose from "mongoose";
import { stringify } from "querystring";
const bcrypt = require("bcryptjs");
const config = require("../config/database");

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favouriteRecipes: [
    {
      _id: String
    }
  ],
  favouriteIngredients: [
    {
      _id: String,
      amount: Number,
      name: String,
      unit: String
    }
  ]
});
const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};
module.exports.getUserByUsername = function (email, callback) {
  const query = { email: email };
  User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
module.exports.saveUser = function (newUser, callback) {
  newUser.save(callback);
};
