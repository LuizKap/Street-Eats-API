import bcrypt from 'bcrypt'

let users = [
    { id: '1', nome: 'Luiz', email: 'luiz@exemplo.com', senha: bcrypt.hashSync('1234', 10) },
    { id: '2', nome: 'Marina', email: 'marina@exemplo.com', senha: bcrypt.hashSync('abcd', 10) },
    { id: '3', nome: 'João Pedro', email: 'joao@exemplo.com', senha: bcrypt.hashSync('senha123', 10) },
    { id: '4', nome: 'Carol', email: 'carol@exemplo.com', senha: bcrypt.hashSync('carolpw', 10) },
    { id: '5', nome: 'Rafa', email: 'rafa@exemplo.com', senha: bcrypt.hashSync('3210', 10) }
]

export const usersModel = {

    getAllUsers: () => {
        return users
    },

    getUserByEmail: (email) => {
        return users.find(user => user.email === email)
    },

    addUser: (user) => {
        users.push(user)
    },

  
    getUserById: (id) => {
        return users.find(user => user.id === id)
    },

    
    deleteUser: (id) => {
        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex === -1) throw new Error('Usuário não encontrado')
        users.splice(userIndex, 1)
    },

    isEmailRegistered: (email) => {
        return users.some(user => user.email === email)
    }

}