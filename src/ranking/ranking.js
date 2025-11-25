let ranking = []

const updateRanking = (foodspotsArray) => {
    let sortedFoodSpots = foodspotsArray
        .sort((a, b) => b.mediaNotas - a.mediaNotas)

    let i = 1
    sortedFoodSpots = sortedFoodSpots.map(foodSpot => ({
        posicao: i++,
        nome: foodSpot.nome,
        nota: foodSpot.mediaNotas
    }))

    ranking = sortedFoodSpots
}

const rankingController = {
    showRanking: (req, res) => {
        return res.status(200).json(ranking)
    }
}

export { updateRanking, rankingController }
