import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

import { usersModel } from '../models/users-model.js';
import { foodSpotsModel } from '../models/foodSpots-model.js';
import { reviewsModel } from '../models/reviews-model.js';


const registerController = (req, res) => {
    const { nome, email, senha } = req.body

    if ([nome, email, senha].some(campo => !campo || typeof campo !== 'string')) {
        return res.status(400).json({ message: 'Dados em falta ou diferente de String' })
    }

    if (usersModel.isEmailRegistered(email)) {
        return res.status(409).json({ message: 'Esse email ja existe em nosso sistema' })
    }

    const user = { id: uuidv4(), nome: nome, email: email, senha: bcrypt.hashSync(senha, 10) }

    usersModel.addUser(user)
    res.status(201).json({ message: 'Usuario Cadastrado com sucesso' })
}

const loginController = (req, res) => {
    const { email, senha } = req.body

    if ([email, senha].some(campo => !campo || typeof campo !== 'string')) {
        return res.status(400).json({ message: 'Dados em falta ou diferente de String' })
    }

    if (!usersModel.isEmailRegistered(email)) {
        return res.status(404).json({ message: 'Esse email nao está registrado em nosso sistema' })
    }

    const user = usersModel.getUserByEmail(email)

    const isPasswordValid = bcrypt.compareSync(senha, user.senha)
    console.log(isPasswordValid)
    if (!isPasswordValid) {
        return res.status(403).json({ message: 'senha inválida' })
    }

    const payload = { id: user.id, nome: user.nome, email: user.email }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' })

    res.status(200).json({ token })
}

const deleteAccountController = (req, res) => {
    const userId = req.user.id

    try {
        usersModel.deleteUser(userId)
        foodSpotsModel.destroyDeletedUser_f_reviews(userId)
        reviewsModel.destroyDeletedUserReviews(userId)
        return res.status(200).json({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export { registerController, loginController, deleteAccountController }