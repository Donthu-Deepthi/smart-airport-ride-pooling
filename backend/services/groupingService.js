const Cab = require("../models/Cab");
const Booking = require("../models/Booking");
const Passenger = require("../models/Passenger");
const mongoose = require("mongoose");
const distance = require("../utils/distance");

const MAX_RADIUS_KM = 15;   // Service radius

async function groupPassenger(passenger) {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const cabs = await Cab.find({
      status: "AVAILABLE",
      availableSeats: { $gte: passenger.seatsRequired }
    }).session(session);

    let anyCabExists = false;

    for (let cab of cabs) {

      anyCabExists = true;

      let booking = await Booking.findOne({
        cab: cab._id,
        status: "ACTIVE"
      }).session(session);

      // ✅ EMPTY CAB → assign directly
      if (!booking) {

        booking = new Booking({
          cab: cab._id,
          passengers: [passenger._id],
          totalFare: 0,
          status: "ACTIVE"
        });

        cab.availableSeats -= passenger.seatsRequired;
        if (cab.availableSeats === 0) cab.status = "FULL";

        await booking.save({ session });
        await cab.save({ session });

        await session.commitTransaction();
        session.endSession();
        return booking;
      }

      // 🔍 Check distance with first passenger
      const firstPassenger = await Passenger.findById(
        booking.passengers[0]
      );

      const d = distance(
        firstPassenger.pickupLocation,
        passenger.pickupLocation
      );

      if (d > MAX_RADIUS_KM) {
        continue;   // try next cab
      }

      // ✅ Pool allowed
      booking.passengers.push(passenger._id);
      cab.availableSeats -= passenger.seatsRequired;
      if (cab.availableSeats === 0) cab.status = "FULL";

      await booking.save({ session });
      await cab.save({ session });

      await session.commitTransaction();
      session.endSession();
      return booking;
    }

    // 🚫 No suitable cab found
    await session.abortTransaction();
    session.endSession();

    if (anyCabExists) {
      return { error: true, reason: "OUT_OF_RADIUS" };
    }

    return null;

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}

module.exports = groupPassenger;
