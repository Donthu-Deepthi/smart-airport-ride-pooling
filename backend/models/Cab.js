const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema({
  driverName: String,
  totalSeats: Number,
  availableSeats: Number,
  luggageCapacity: Number,
  status: { type: String, default: "AVAILABLE" }
});

module.exports = mongoose.model("Cab", cabSchema);
