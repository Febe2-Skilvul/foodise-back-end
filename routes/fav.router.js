const express = require('express')
const favRoute = express.Router()

const {
    addFavFoodByUser,
    getFavFoodByUser,
    deleteFavFoodById
} = require('../controllers/fav.controller')

const { tokenVerified, forUser } = require("../middleware")


favRoute.post("/", [tokenVerified, forUser],addFavFoodByUser)
favRoute.get("/", [tokenVerified, forUser],getFavFoodByUser)
favRoute.delete("/:id", [tokenVerified, forUser], deleteFavFoodById)


module.exports = favRoute