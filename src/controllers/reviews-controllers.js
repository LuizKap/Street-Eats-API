import { reviewsModel } from "../models/reviews-model.js";
import { v4 as uuidv4 } from 'uuid';

const reviewsControllers = {

    getAllReviewsByFoodSpotId: (req, res) => {
        const { foodSpotId } = req.params

        if (!foodSpotId)
            return res.status(400).json({ message: 'foodSpotId undefined' })

        try {
            const reviews = reviewsModel.getAllReviewsByFoodSpotId(foodSpotId)
            return res.status(200).json({ reviews })
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }
    },

    addReview: (req, res) => {
        const userId = req.user.id
        const { foodSpotId } = req.params
        const { comentario, nota } = req.body

        if ([userId, foodSpotId, comentario, nota].some(campo => !campo))
            return res.status(400).json({ message: 'Dados em falta' })

        if (typeof comentario !== "string" || typeof nota !== "number")
            return res.status(400).json({ message: 'Erro de tipos' })

        if (nota > 5 || nota < 0)
            return res.status(400).json({ message: 'Nota deve ser 0-5' })

        const review = {
            id: uuidv4(),
            userId,
            foodSpotId,
            comentario,
            nota,
            data: new Date()
        }

        reviewsModel.addReview(review)
        return res.status(201).json(review)
    },

    updateReview: (req, res) => {
        const userId = req.user.id
        const { reviewId } = req.params
        const { comentario, nota } = req.body

        if ([userId, reviewId].some(campo => !campo))
            return res.status(400).json({ message: 'Dados em falta' })

        if (comentario !== undefined && typeof comentario !== "string")
            return res.status(400).json({ message: 'comentario deve ser string' })

        if (nota !== undefined && typeof nota !== 'number')
            return res.status(400).json({ message: 'nota deve ser number' })

        const updatedReview = reviewsModel.updateReview(userId, reviewId, comentario, nota)

        if (!updatedReview)
            return res.status(404).json({ message: 'Não encontrado' })

        return res.status(200).json(updatedReview)
    },

    deleteReview: (req, res) => {
        const userId = req.user.id
        const { reviewId } = req.params

        if ([userId, reviewId].some(campo => !campo))
            return res.status(400).json({ message: 'Dados em falta' })

        try {
            reviewsModel.deleteReview(userId, reviewId)
            return res.status(200).json({ message: 'Deletado com sucesso!' })
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }
    }
}

export { reviewsControllers }
