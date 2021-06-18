// Calling the "mongoose" package
const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
});

// Creating a Model from that Schema
const File = mongoose.model("File", fileSchema);

// Exporting the Model to use it in app.js File.
module.exports = File;
