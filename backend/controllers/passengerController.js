const Passenger = require("../models/Passenger");
const groupPassenger = require("../services/groupingService");
const calculateFare = require("../services/pricingService");

const AIRPORT = { lat: 17.2403, lng: 78.4294 };

exports.createPassenger = async (req, res) => {

  const passenger = await Passenger.create(req.body);

  const booking = await groupPassenger(passenger);

  // ❌ Outside service radius
  if (booking && booking.error) {
    return res.json({
      passenger,
      booking: null,
      message: "You are outside our 15km service radius."
    });
  }

  // ❌ No cab
  if (!booking) {
    return res.json({
      passenger,
      booking: null,
      message: "No cabs available right now."
    });
  }

  const fare = calculateFare(
    passenger.pickupLocation,
    AIRPORT,
    booking.passengers.length
  );

  booking.totalFare += fare;
  await booking.save();

  const populatedBooking = await booking.populate("cab");

  res.json({
    passenger,
    booking: populatedBooking,
    fare
  });
};
