import express from 'express'
import { registerController, loginController, deleteAccountController } from '../controllers/auth-controllers.js'
import { ensureAuth } from '../middlewares/ensureAuth-middleware.js'

export const authRouter = express.Router()


authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.delete('/delete', ensureAuth, deleteAccountController)




