import mongoose from "mongoose";

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  id: String,
  name: String,
  unit: String
});

const Ingredient = (module.exports = mongoose.model("Ingredient", UserSchema));

module.exports.getIngredient = function(id, callback) {
  Ingredient.findById(id, callback);
};
