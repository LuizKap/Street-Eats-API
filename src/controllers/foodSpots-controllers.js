import { foodSpotsModel } from "../models/foodSpots-model.js";
import { v4 as uuidv4 } from 'uuid';

const foodSpotsControllers = {

    getAll: (req, res) => {
        const foodSpots = foodSpotsModel.getAll()
        if (!foodSpots || foodSpots.length === 0) return res.status(404).json({ message: 'Não encontrado!' })
        return res.status(200).json(foodSpots)
    },

    getById: (req, res) => {
        const { id } = req.params

        const foodSpot = foodSpotsModel.getById(id)
        if (!foodSpot)
            return res.status(404).json({ message: 'Não encontrado!' })

        return res.status(200).json(foodSpot)
    },

    getByTipo: (req, res) => {
        const { tipo } = req.params

        if (!tipo)
            return res.status(400).json({ message: 'Tipo indefinido' })

        try {
            const foodSpots = foodSpotsModel.getByTipo(tipo)
            return res.status(200).json(foodSpots)
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }
    },

    addFoodSpot: (req, res) => {
        const { nome, tipo, endereco, horarioDeFuncionamento } = req.body

        if ([nome, tipo, endereco, horarioDeFuncionamento].some(campo => typeof campo !== 'string' || campo.trim() === ''))
            return res.status(400).json({ message: 'Dados inválidos' })

        const foodSpot = {
            id: uuidv4(),
            nome,
            tipo,
            endereco,
            horarioDeFuncionamento,
            mediaNotas: 0,
            reviews: []
        }

        foodSpotsModel.addFoodSpot(foodSpot)
        return res.status(201).json(foodSpot)
    },

    updateFoodSpot: (req, res) => {
        const { id } = req.params
        const { nome, tipo, endereco, horarioDeFuncionamento } = req.body

        if (!id)
            return res.status(400).json({ message: 'id undefined' })

        if (nome !== undefined && typeof nome !== 'string')
            return res.status(400).json({ message: 'nome inválido' })

        if (tipo !== undefined && typeof tipo !== 'string')
            return res.status(400).json({ message: 'tipo inválido' })

        if (endereco !== undefined && typeof endereco !== 'string')
            return res.status(400).json({ message: 'endereco inválido' })

        if (horarioDeFuncionamento !== undefined && typeof horarioDeFuncionamento !== 'string')
            return res.status(400).json({ message: 'horário inválido' })

        const updatedFoodSpot = foodSpotsModel.updateFoodSpot(id, nome, tipo, endereco, horarioDeFuncionamento)

        if (!updatedFoodSpot)
            return res.status(404).json({ message: 'Não encontrado!' })

        return res.status(200).json(updatedFoodSpot)
    },

    deleteFoodSpot: (req, res) => {
        const { id } = req.params

        if (!id)
            return res.status(400).json({ message: 'id undefined' })

        const foodSpot = foodSpotsModel.deleteFoodSpot(id)
        if (!foodSpot) { res.status(404).json({ message: 'Não encontrado!' }) }
        return res.status(200).json({ message: 'Deletado com sucesso' })
    }
}

export { foodSpotsControllers }
