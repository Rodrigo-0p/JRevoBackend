const { DataTypes } = require('sequelize');
const sequelize     = require('../config/db.config');

const Usuario = sequelize.define('Usuario', {
  cod_usuario : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  password    : DataTypes.STRING,
  usuario     : { type: DataTypes.STRING, unique: true },
  nombre      : DataTypes.STRING,
  cod_rol     : DataTypes.INTEGER,
  estado      : { type: DataTypes.ENUM('S', 'N'), defaultValue: 'S' }
},{
  tableName: 'usuarios',
  timestamps: true
});

module.exports = Usuario;
