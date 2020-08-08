import mongoose from "mongoose";

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  id: String,
  title: String,
  ingredients: [{ name: String, _id: String, amount: Number, unit: String }],
  progress: String,
  time: Number,
  difficulty: [String],
  foodStyle: [String],
  foodType: [String]
});

const Recipe = (module.exports = mongoose.model("Recipe", UserSchema));

module.exports.getRecipeById = function(id, callback) {
  Recipe.findById(id, callback);
};
