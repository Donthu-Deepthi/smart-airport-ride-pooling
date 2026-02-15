const router = require("express").Router();
const controller = require("../controllers/passengerController");

router.post("/", controller.createPassenger);

module.exports = router;
