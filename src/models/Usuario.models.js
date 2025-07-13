const { DataTypes } = require('sequelize');
const sequelize     = require('../config/db.config');

const Usuario = sequelize.define('Usuario', {
  cod_usuario : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre      : DataTypes.STRING,
  email       : { type: DataTypes.STRING, unique: true },
  password    : DataTypes.STRING,
  cod_rol     : DataTypes.INTEGER,
  estado      : { type: DataTypes.ENUM('S', 'N'), defaultValue: 'S' }
},{
  tableName: 'usuarios',
  timestamps: true
});

module.exports = Usuario;
