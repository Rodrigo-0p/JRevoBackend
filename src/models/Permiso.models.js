const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Permiso = sequelize.define('Permiso', {
  cod_permiso    : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cod_rol        : DataTypes.INTEGER,
  cod_modulo     : DataTypes.INTEGER,
  puede_crear    : { type: DataTypes.ENUM('S', 'N'), defaultValue: 'N' },
  puede_leer     : { type: DataTypes.ENUM('S', 'N'), defaultValue: 'S' },
  puede_editar   : { type: DataTypes.ENUM('S', 'N'), defaultValue: 'N' },
  puede_eliminar : { type: DataTypes.ENUM('S', 'N'), defaultValue: 'N' }
}, {
  tableName: 'permisos',
  timestamps: false
});

module.exports = Permiso;