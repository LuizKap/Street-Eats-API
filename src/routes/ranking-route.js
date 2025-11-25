import express from 'express'
import { rankingController} from '../ranking/ranking.js'

const rankingRouter = express.Router()

rankingRouter.get('/', rankingController.showRanking)

export { rankingRouter }