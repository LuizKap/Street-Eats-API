import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import { usersModel } from '../models/users-model.js';
config()


const ensureAuth = (req, res, next) => {

    const authHeader = req.headers.authorization //bearer Token
    if (!authHeader) return res.status(401).json({ message: 'Essa ação requere login' })
    const token = authHeader.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user = usersModel.getUserById(id)
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'token inválido / expirado' })
    }
}

export { ensureAuth }