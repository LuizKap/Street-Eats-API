import { foodSpotsModel } from "./foodSpots-model.js"

let reviews = [

    { id: '1', userId: '2', foodSpotId: '1', nota: 5, comentario: 'Melhor dog da região, bom preço e rápido.', data: new Date("2024-09-10") },
    { id: '2', userId: '3', foodSpotId: '1', nota: 4, comentario: 'Muito bom, só achei o pão um pouco seco.', data: new Date("2024-10-02") },

    { id: '3', userId: '4', foodSpotId: '2', nota: 5, comentario: 'Sushi fresco e atendimento top.', data: new Date("2024-09-18") },
    { id: '4', userId: '1', foodSpotId: '2', nota: 3.5, comentario: 'Bom, mas o temaki podia ser maior.', data: new Date("2024-11-01") },

    { id: '5', userId: '5', foodSpotId: '3', nota: 4, comentario: 'Pizza gostosa, massa fina.', data: new Date("2024-08-22") },
    { id: '6', userId: '3', foodSpotId: '3', nota: 3.2, comentario: 'Boa, mas demorou demais.', data: new Date("2024-10-15") },

    { id: '7', userId: '1', foodSpotId: '4', nota: 5, comentario: 'Hambúrguer artesanal impecável!', data: new Date("2024-11-10") },
    { id: '8', userId: '2', foodSpotId: '4', nota: 4.6, comentario: 'Muito bom, cheddar top.', data: new Date("2024-11-11") },

    { id: '9', userId: '4', foodSpotId: '5', nota: 4, comentario: 'Macarrão bem temperado.', data: new Date("2024-08-12") },
    { id: '10', userId: '5', foodSpotId: '5', nota: 3.8, comentario: 'Bom, mas caro demais.', data: new Date("2024-09-01") },

    { id: '11', userId: '3', foodSpotId: '6', nota: 4.5, comentario: 'Açaí bem cremoso.', data: new Date("2024-10-20") },
    { id: '12', userId: '2', foodSpotId: '6', nota: 3.7, comentario: 'Demoraram para atender.', data: new Date("2024-11-05") }
]

const reviewsModel = {

    getAllReviewsByFoodSpotId: (foodSpotId) => {
        const foodSpotReviews = reviews.filter(r => r.foodSpotId === foodSpotId)

        if (foodSpotReviews.length === 0)
            throw new Error('Esse lugar ainda não tem reviews :/')

        return foodSpotReviews
    },

    addReview: (review) => {
        if (!review) return null

        reviews.push(review)
        foodSpotsModel.add_f_reviews(review)

        return review
    },

    updateReview: (userId, reviewId, comentario, nota) => {
        const review = reviews.find(
            r => r.id === reviewId && r.userId === userId
        )

        if (!review) return null

        if (comentario !== undefined) review.comentario = comentario
        if (nota !== undefined) review.nota = nota

        foodSpotsModel.update_f_reviews(review)

        return review
    },

    deleteReview: (userId, reviewId) => {
        const review = reviews.find(r => r.id === reviewId)

        if (!review) throw new Error('Review inexistente')
        if (review.userId !== userId)
            throw new Error('Essa review não pertence a esse usuário')

        foodSpotsModel.delete_f_reviews(review)

        reviews = reviews.filter(r => r.id !== reviewId)
    },

    destroyDeletedUserReviews: (userId) => {
        const updatedReviews = reviews.filter(review => review.userId !== userId)
        reviews = updatedReviews
    }
}

export { reviewsModel }
