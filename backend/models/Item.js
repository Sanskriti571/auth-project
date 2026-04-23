const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: String, // lost / found
  location: String,
  userId: String
});

module.exports = mongoose.model("Item", itemSchema);