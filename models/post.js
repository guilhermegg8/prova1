const db = require("./banco")

const Clientes = db.sequelize.define('clientes', {
    nome:{
        type: db.Sequelize.STRING
    },
    endereco:{
        type: db.Sequelize.STRING
    },
    bairro:{
        type: db.Sequelize.STRING
    },
    cep:{
        type: db.Sequelize.INTEGER
    },
    cidade:{
        type: db.Sequelize.STRING
    },
    estado:{
        type: db.Sequelize.STRING
    }
})

//Clientes.sync({force: true})

module.exports = Clientes