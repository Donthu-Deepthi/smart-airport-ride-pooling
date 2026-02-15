const distance = require("../utils/distance");

const BASE_FARE = 100;
const PER_KM_RATE = 10;
const POOL_DISCOUNT = 0.2;

function calculateFare(pickupLocation, airportLocation, passengerCount) {

  const km = distance(pickupLocation, airportLocation);

  let fare = BASE_FARE + (km * PER_KM_RATE);

  if (passengerCount > 1) {
    fare = fare * (1 - POOL_DISCOUNT);
  }

  return Math.round(fare);
}

module.exports = calculateFare;
