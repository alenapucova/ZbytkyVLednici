import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

export default mongoose.model("User", User);
