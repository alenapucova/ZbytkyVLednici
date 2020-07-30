import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Recipe = new Schema({
  id: String,
  title: String,
  ingredients: [{ name: String, id: Number, amount: Number, unit: [String] }],
  progress: String,
  time: Number,
  difficulty: [String],
  foodStyle: [String],
  foodType: [String]
});

export default mongoose.model("Recipe", Recipe);
