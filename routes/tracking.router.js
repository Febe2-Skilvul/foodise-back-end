const express = require('express')
const trackingRoute = express.Router()

const {
    getTracking,
    addTracking,
    trackingToday,
    trackingPerDate
} = require('../controllers/tracking.controller')

const { tokenVerified, forUser } = require("../middleware")


trackingRoute.get("/", [tokenVerified, forUser],getTracking)
trackingRoute.post("/", [tokenVerified, forUser],addTracking)
trackingRoute.get("/today", [tokenVerified, forUser], trackingToday)
trackingRoute.get("/:date", [tokenVerified, forUser], trackingPerDate)


module.exports = trackingRoute