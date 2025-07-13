const path       = require('path');
require('dotenv').config({path:path.join(__dirname,'..','..','.env')});

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect  : 'postgres'              ,
    host     : process.env.DB_HOST     ,// donde esta alijado la bd
    username : process.env.DB_USER     ,
    password : process.env.DB_PASSWORD ,
    database : process.env.DB_NAME     ,
    port     : 5432
});

module.exports = sequelize;