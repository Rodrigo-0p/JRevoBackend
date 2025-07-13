const { DataTypes } = require('sequelize');
const sequelize     = require('../config/db.config');

const Rol = sequelize.define('Rol', {
  cod_rol : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre  : DataTypes.STRING
}, {
  tableName: 'roles',
  timestamps: false
});

module.exports = Rol;