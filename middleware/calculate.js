module.exports = {
    totalNutri: (data) => {
        let totCarb = 0
        let totProtein = 0
        let totFat = 0
        let totCal = 0
        let totCarbon= 0
        if(data) {
            totCarb = data.food.reduce((prev, curr) => prev + (curr.foodId.carb * curr.portion), 0)
            totProtein = data.food.reduce((prev, curr) => prev + (curr.foodId.protein * curr.portion), 0)
            totFat = data.food.reduce((prev, curr) => prev + (curr.foodId.fat * curr.portion), 0)
            totCal = data.food.reduce((prev, curr) => prev + (curr.foodId.cal * curr.portion), 0)
            totCarbon = data.food.reduce((prev, curr) => prev + (curr.foodId.carbon * curr.portion), 0)
        }

        const nutri = {
            totCarb: Number(totCarb.toFixed(2)),
            totProtein: Number(totProtein.toFixed(2)),
            totFat: Number(totFat.toFixed(2)),
            totCal: Number(totCal.toFixed(2)),
            totCarbon: Number(totCarbon.toFixed(2)),
        }
        return nutri
    },
    findByDate: (data, trackDate) => {
        const tracking = data.findIndex(el => el.date.toISOString().includes(trackDate))
        return tracking
    }
}