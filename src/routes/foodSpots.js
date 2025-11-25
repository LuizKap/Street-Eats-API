import express from 'express'
import { foodSpotsControllers } from '../controllers/foodSpots-controllers.js'
import { ensureAuth } from '../middlewares/ensureAuth-middleware.js'

const foodSpotsRouter = express.Router()

// ensureOwner é um middleware não implementado para permitir apenas o criador (owner) editar/excluir

foodSpotsRouter.get('/', foodSpotsControllers.getAll)
foodSpotsRouter.get('/tipo/:tipo', foodSpotsControllers.getByTipo)
foodSpotsRouter.get('/:id', foodSpotsControllers.getById)

foodSpotsRouter.post('/', ensureAuth, foodSpotsControllers.addFoodSpot)
foodSpotsRouter.put('/:id',/*ensureOWNER*/ foodSpotsControllers.updateFoodSpot)

foodSpotsRouter.delete('/:id',/*ensureOWNER*/ foodSpotsControllers.deleteFoodSpot)


export { foodSpotsRouter }