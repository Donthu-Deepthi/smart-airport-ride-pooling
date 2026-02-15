const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  name: String,
  pickupLocation: {
    lat: Number,
    lng: Number
  },
  luggage: Number,
  seatsRequired: { type: Number, default: 1 },
  detourToleranceKm: { type: Number, default: 5 }
}, { timestamps: true });

passengerSchema.index({ pickupLocation: "2dsphere" });

module.exports = mongoose.model("Passenger", passengerSchema);
