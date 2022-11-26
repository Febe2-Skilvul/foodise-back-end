const express = require('express')
const foodRoute = express.Router();

const { 
    getAll, 
    getSearch,
    getById,
    add,
    addMany,
    edit,
    getByCategory
} = require('../controllers/food.controller')

const { onlyAdmin, tokenVerified } = require("../middleware")



foodRoute.get("/", getAll)
foodRoute.get("/search", getSearch)
foodRoute.get("/:id", getById)
foodRoute.get("/category/:category", getByCategory)
foodRoute.post("/", [tokenVerified, onlyAdmin], addMany)
foodRoute.patch("/:id", [tokenVerified, onlyAdmin], edit)



module.exports = foodRoute