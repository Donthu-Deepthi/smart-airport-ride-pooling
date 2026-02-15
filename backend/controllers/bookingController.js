const Booking = require("../models/Booking");

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  booking.status = "CANCELLED";
  await booking.save();
  res.json({ message: "Cancelled" });
};
