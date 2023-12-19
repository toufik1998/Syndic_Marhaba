const express = require("express");
const checkUserAuth = require("../middlewares/auth-middleware")
const { getDelivery } = require("../controllers/deliveryController")
const router = express.Router();





router.get("/delivery/me", getDelivery);

module.exports = router;



