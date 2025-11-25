import { calculateMedia } from "../helper/calculateMedia.js"
import { updateRanking } from "../ranking/ranking.js"

let foodSpots = [
    {
        id: '1',
        nome: 'Lanches do Chaves',
        tipo: 'hot-dog',
        endereco: 'rua-governador-valadares-17',
        horarioDeFuncionamento: '18:00-00:00',
        mediaNotas: 4.5,
        reviews: [
            {
                id: '1',
                userId: '2',
                foodSpotId: '1',
                nota: 5,
                comentario: 'Melhor dog da região, bom preço e rápido.',
                data: new Date("2024-09-10")
            },
            {
                id: '2',
                userId: '3',
                foodSpotId: '1',
                nota: 4,
                comentario: 'Muito bom, só achei o pão um pouco seco.',
                data: new Date("2024-10-02")
            }
        ]
    },

    {
        id: '2',
        nome: 'Sushi da Vila',
        tipo: 'japonesa',
        endereco: 'av-central-300',
        horarioDeFuncionamento: '11:00-23:00',
        mediaNotas: 4.3,
        reviews: [
            {
                id: '3',
                userId: '4',
                foodSpotId: '2',
                nota: 5,
                comentario: 'Sushi fresco e atendimento top.',
                data: new Date("2024-09-18")
            },
            {
                id: '4',
                userId: '1',
                foodSpotId: '2',
                nota: 3.5,
                comentario: 'Bom, mas o temaki podia ser maior.',
                data: new Date("2024-11-01")
            }
        ]
    },

    {
        id: '3',
        nome: 'Pizzaria do Tio Zé',
        tipo: 'pizza',
        endereco: 'rua-doze-45',
        horarioDeFuncionamento: '19:00-23:30',
        mediaNotas: 3.6,
        reviews: [
            {
                id: '5',
                userId: '5',
                foodSpotId: '3',
                nota: 4,
                comentario: 'Pizza gostosa, massa fina do jeito que curto.',
                data: new Date("2024-08-22")
            },
            {
                id: '6',
                userId: '3',
                foodSpotId: '3',
                nota: 3.2,
                comentario: 'Boa, mas demorou quase 1 hora.',
                data: new Date("2024-10-15")
            }
        ]
    },

    {
        id: '4',
        nome: 'Hamburgueria Garage 88',
        tipo: 'hamburguer',
        endereco: 'rua-das-flores-88',
        horarioDeFuncionamento: '17:00-01:00',
        mediaNotas: 4.8,
        reviews: [
            {
                id: '7',
                userId: '1',
                foodSpotId: '4',
                nota: 5,
                comentario: 'Hambúrguer artesanal impecável!',
                data: new Date("2024-11-10")
            },
            {
                id: '8',
                userId: '2',
                foodSpotId: '4',
                nota: 4.6,
                comentario: 'Muito bom, cheddar delicioso.',
                data: new Date("2024-11-11")
            }
        ]
    },

    {
        id: '5',
        nome: 'Cantina da Dona Rosa',
        tipo: 'italiana',
        endereco: 'travessa-rosa-9',
        horarioDeFuncionamento: '12:00-22:00',
        mediaNotas: 3.9,
        reviews: [
            {
                id: '9',
                userId: '4',
                foodSpotId: '5',
                nota: 4,
                comentario: 'Macarrão bem temperado e molho caseiro.',
                data: new Date("2024-08-12")
            },
            {
                id: '10',
                userId: '5',
                foodSpotId: '5',
                nota: 3.8,
                comentario: 'Bom, mas caro demais para o tamanho da porção.',
                data: new Date("2024-09-01")
            }
        ]
    },

    {
        id: '6',
        nome: 'Açaí do Morro',
        tipo: 'acai',
        endereco: 'avenida-morro-50',
        horarioDeFuncionamento: '13:00-22:00',
        mediaNotas: 4.1,
        reviews: [
            {
                id: '11',
                userId: '3',
                foodSpotId: '6',
                nota: 4.5,
                comentario: 'Açaí bem cremoso, ótimo custo-benefício.',
                data: new Date("2024-10-20")
            },
            {
                id: '12',
                userId: '2',
                foodSpotId: '6',
                nota: 3.7,
                comentario: 'Bom, mas demoraram pra atender.',
                data: new Date("2024-11-05")
            }
        ]
    }
]

updateRanking(foodSpots)

const foodSpotsModel = {
    getAll: () => foodSpots,

    getById: id => foodSpots.find(f => f.id === id),

    getByTipo: tipo => {
        const list = foodSpots.filter(f => f.tipo === tipo)
        if (list.length === 0) throw new Error('Não há nenhum lugar com esse tipo ainda :(')
        return list
    },

    addFoodSpot: fs => {
        foodSpots.push(fs)
        updateRanking(foodSpots)
    },

    updateFoodSpot: (id, nome, tipo, endereco, horarioDeFuncionamento) => {
        const fs = foodSpots.find(f => f.id === id)
        if (nome) fs.nome = nome
        if (tipo) fs.tipo = tipo
        if (endereco) fs.endereco = endereco
        if (horarioDeFuncionamento) fs.horarioDeFuncionamento = horarioDeFuncionamento
        return fs
    },

    deleteFoodSpot: id => {
        const index = foodSpots.findIndex(f => f.id === id)
        if (index === -1) return false
        const removed = foodSpots.splice(index, 1)
        updateRanking(foodSpots)
        return removed
    },

    add_f_reviews: review => {
        const fs = foodSpots.find(f => f.id === review.foodSpotId)
        fs.reviews.push(review)
        fs.mediaNotas = calculateMedia(fs)
        updateRanking(foodSpots)
    },

    update_f_reviews: review => {
        const fs = foodSpots.find(f => f.id === review.foodSpotId)
        const i = fs.reviews.findIndex(r => r.id === review.id)
        fs.reviews[i] = { ...fs.reviews[i], ...review }
        fs.mediaNotas = calculateMedia(fs)
        updateRanking(foodSpots)
    },

    delete_f_reviews: review => {
        const fs = foodSpots.find(f => f.id === review.foodSpotId)
        const i = fs.reviews.findIndex(r => r.id === review.id)
        fs.reviews.splice(i, 1)
        fs.mediaNotas = calculateMedia(fs)
        updateRanking(foodSpots)
    },

    destroyDeletedUser_f_reviews: userId => {
        foodSpots.forEach(foodSpot => {
            foodSpot.reviews = foodSpot.reviews.filter(review => review.userId !== userId)
            calculateMedia(foodSpot)
        })
        updateRanking(foodSpots)
    }
}

export { foodSpotsModel }
