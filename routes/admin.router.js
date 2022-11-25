const express = require('express')
const adminRoute = express.Router();

const { signinAdmin } = require('../controllers/admin.controller')

adminRoute.post("/signin", signinAdmin)

module.exports = adminRoute