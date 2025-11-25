import express from 'express'
import { reviewsControllers } from '../controllers/reviews-controllers.js'
import { ensureAuth } from '../middlewares/ensureAuth-middleware.js'

const reviewsRouter = express.Router()

reviewsRouter.get('/food-spot/:foodSpotId', reviewsControllers.getAllReviewsByFoodSpotId)
reviewsRouter.post('/food-spot/:foodSpotId', ensureAuth, reviewsControllers.addReview)
reviewsRouter.put('/:reviewId', ensureAuth, reviewsControllers.updateReview)
reviewsRouter.delete('/:reviewId', ensureAuth, reviewsControllers.deleteReview)

export { reviewsRouter }
