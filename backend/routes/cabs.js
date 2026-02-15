const router = require("express").Router();
const controller = require("../controllers/cabController");

router.post("/", controller.createCab);

module.exports = router;
