const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  cab: { type: mongoose.Schema.Types.ObjectId, ref: "Cab" },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Passenger" }],
  totalFare: Number,
  status: { type: String, default: "ACTIVE" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
