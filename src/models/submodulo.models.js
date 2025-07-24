const { DataTypes } = require('sequelize');
const sequelize     = require('../config/db.config');

const Submodulo = sequelize.define('submodulo', {
  cod_submodulo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cod_modulo   : DataTypes.INTEGER,
  nombre       : DataTypes.STRING,
  ruta         : DataTypes.STRING,
  icono        : DataTypes.STRING,
  estado       : { type: DataTypes.ENUM('S', 'N'), defaultValue: 'S' },
},{
  tableName: 'submodulos',
  timestamps: false
});

module.exports = Submodulo;