const express = require('express')
const userRoute = express.Router();

const { get, editProfile, editAkun, changePassword } = require('../controllers/profile.controller')
const { tokenVerified, forUser } = require('../middleware/index')

userRoute.get("/", [tokenVerified, forUser], get)
userRoute.put("/", [tokenVerified, forUser], editProfile)
userRoute.put("/account",[tokenVerified, forUser] ,editAkun)
userRoute.put("/change-password",[tokenVerified, forUser] ,changePassword)

module.exports = userRoute