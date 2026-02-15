const Cab = require("../models/Cab");

exports.createCab = async (req, res) => {
  const cab = await Cab.create(req.body);
  res.json(cab);
};
