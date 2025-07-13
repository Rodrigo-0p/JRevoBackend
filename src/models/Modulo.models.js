const { DataTypes } = require('sequelize');
const sequelize     = require('../config/db.config');

const Modulo = sequelize.define('Modulo', {
  cod_modulo : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre     : DataTypes.STRING,
  ruta       : DataTypes.STRING,
  icono      : DataTypes.STRING,
  estado     : { type: DataTypes.ENUM('S', 'N'), defaultValue: 'S' }
}, {
  tableName: 'modulos',
  timestamps: false
});

module.exports = Modulo;