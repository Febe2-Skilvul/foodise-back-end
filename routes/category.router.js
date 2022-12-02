const express = require('express')
const categoryRoute = express.Router();

const { 
    get,
    add
} = require('../controllers/category.controller')

const { onlyAdmin, tokenVerified } = require("../middleware")

categoryRoute.get("/", get)
categoryRoute.post("/", [tokenVerified, onlyAdmin], add)

module.exports = categoryRoute