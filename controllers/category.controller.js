const Category = require("../models/category")

module.exports = {
    get: async (request, response) => {
        try {
            const category = await Category.find()
            response.send(category)
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    },

    // admin accessibility
    add: async (request, response) => {
        try {
            const data = request.body
            const categoryCreated = new Category(data)
            await categoryCreated.save()
            response.status(201).send({
                message: "category added successfully",
                data
            })
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    }
}