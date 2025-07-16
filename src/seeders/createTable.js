const { sequelize } = require('../models/index'); // ajusta la ruta si es necesario

// CREA O MODIFICA TABLAS SEGÚN MODELOS
(async () => {
  try {
    await sequelize.sync({ alter: true });  
    console.log('Tablas sincronizadas correctamente.');
  } catch (error) {
    console.error('Error al sincronizar tablas:', error);
  }
})();

