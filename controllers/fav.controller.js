const Favorite = require("../models/favfood")
const { tokenReturned } = require("../middleware");

module.exports = {
    addFavFoodByUser: async (request, response) => {
        const {data} = tokenReturned(request, response)
        const userId = data._id
        const favData = request.body
        try {
            if (favData.user == userId) {
                const favExist = await Favorite.findOne({ food: favData.food, user: favData.user })
                if (favExist === null ) {
                    const newFav = request.body
                    const fav = await new Favorite(newFav)
                    fav.save()
                    response.send({
                        message: "favorite food data added successfully",
                        "favorite": fav._id, newFav
                    })
                } else {
                    response.send({ message: "the food have already exist on your favorite" })
                }
            } else {
                response.status(400).send({ message: "unauthorized, forbidden" })
            }
        } catch (error) {
            response.status(500).send({
            error: error.message
            })
        }
    },
    getFavFoodByUser: async (request, response) => {
        const {data} = tokenReturned(request, response)
        const userId = data._id
        try {
            const fav = await Favorite.find({ user: userId }).populate("food")
            response.send(fav)
        } catch (error) {
            response.status(500).send({error:error.message})
        }
    },
    deleteFavFoodById: async (request, response) => {
        try {
            const favDel = await Favorite.findOneAndDelete({
                _id: request.params.id,
            })
            response.json({
                message: "favorite food data deleted successfully"
            })
        } catch (error) {
            response.status(500).json({
                message: "failed delete favorite food data",
                error: error.message
            })
        }
    }
}