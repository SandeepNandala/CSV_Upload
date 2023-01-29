const mongoose = require("mongoose");

// creating a CSV model for storing the filename.
const CSVSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CSV_model = new mongoose.model("CSV_model", CSVSchema);

module.exports = CSV_model;
