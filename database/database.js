const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas','root','Acqddsdl7423',{
   host: 'localhost',
    dialect: 'mysql'

});

module.exports = connection;