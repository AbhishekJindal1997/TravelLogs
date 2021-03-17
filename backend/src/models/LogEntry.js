const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requiredString = {
  type: String,
  required: true,
};

const logEntrySchema = new Schema(
  {
    title: requiredString,
    description: String,
    comments: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: { type: Number, min: -90, max: 90, required: true },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
      required: true,
    },
    visitDate: { required: true, type: Date },
  },
  { timestamp: true }
);

const LogEntry = mongoose.model("LogEntry", logEntrySchema); // model gives us methods like find,create,update etc
module.exports = LogEntry;
