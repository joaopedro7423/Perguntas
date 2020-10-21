
// documento para gerar a tabela

const { Sequelize } = require("sequelize/types");

const Sequelize = require('sequelize');
const connection = require("./database/database");


const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    desc:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false}).then(()=>{});

module.exports = Pergunta;
