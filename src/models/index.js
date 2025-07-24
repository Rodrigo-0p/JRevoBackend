const sequelize = require('../config/db.config');
const Usuario   = require('./Usuario.models');
const Rol       = require('./Rol.models');
const Modulo    = require('./Modulo.models');
const SubModulo = require('./submodulo.models');
const Permiso   = require('./Permiso.models');

//*****************************************
// CREACION DE LA RELACIONES DE LA TABLAS
//*****************************************

Rol.hasMany(Usuario       , { foreignKey: 'cod_rol' });
Usuario.belongsTo(Rol     , { foreignKey: 'cod_rol' });

Rol.belongsToMany(Modulo  , { through: Permiso, foreignKey: 'cod_rol' });
Modulo.belongsToMany(Rol  , { through: Permiso, foreignKey: 'cod_modulo' });

Permiso.belongsTo(Modulo  , { foreignKey: 'cod_modulo' });
Permiso.belongsTo(Rol     , { foreignKey: 'cod_rol'    });
 
Modulo.hasMany(SubModulo  , { foreignKey: 'cod_modulo', as: 'submodulos' });
SubModulo.belongsTo(Modulo, { foreignKey: 'cod_modulo', as: 'modulo' });

module.exports = { sequelize, Usuario, Rol, Modulo, Permiso, SubModulo};