const express = require('express');
const router = express.Router()

const authRoute = require('./auth.router')
const foodRoute = require('./food.router')
const resepRoute = require('./resep.router')
const categoryRoute = require('./category.router')
const adminRoute = require('./admin.router')
const favRoute = require('./fav.router')

router.use("/auth", authRoute)
router.use("/foods", foodRoute)
router.use("/recipes", resepRoute)
router.use("/categories", categoryRoute)
router.use("/admin", adminRoute)
router.use("/favorites", favRoute)


module.exports = router;