const router = require("express").Router();
const controller = require("../controllers/bookingController");

router.patch("/:id/cancel", controller.cancelBooking);

module.exports = router;
