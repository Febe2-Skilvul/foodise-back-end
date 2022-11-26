module.exports = {
    totalNutri: (data) => {
        let totCarb = 0, totProtein = 0, totFat = 0
        if(data) {
            totCarb = data.food.reduce((prev, curr) => prev + (curr.foodId.carb * curr.portion), 0)
            totProtein = data.food.reduce((prev, curr) => prev + (curr.foodId.protein * curr.portion), 0)
            totFat = data.food.reduce((prev, curr) => prev + (curr.foodId.fat * curr.portion), 0)
        }

        const nutri = {
            totCarb: Number(totCarb.toFixed(2)),
            totProtein: Number(totProtein.toFixed(2)),
            totFat: Number(totFat.toFixed(2))
        }
        return nutri
    },
    findByDate: (data, date) => {
        const tracking = data.findIndex(el => el.date.toISOString().includes(date))
        return tracking
    }
}