const express = require("express");
const router = express.Router();
const { exchange } = require("../controllers/exchangeControllers");

router.get("/", (req, res) => {
  res.send("Backend server is running");
});

router.get("/exchanges", exchange);

module.exports = router;
