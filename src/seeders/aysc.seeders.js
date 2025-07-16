const { Usuario, Rol } = require('../models');
const bcrypt           = require('bcrypt');
// EJECUTA SOLO UNA VEZ ATRAVEZ DE NODE

(async () => {
  try {
    // Crear roles en caso de no tener un rol crearlo
    // const adminRol = await Rol.create({ nombre: 'Administrador' });
  
    // Crear usuario admin con contraseña hasheada
    // hash contraseña
    const has            = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("jacosta123",has);

    await Usuario.create({
      nombre    : 'Juan Acosta',
      usuario   : 'jacosta',
      password  : hashedPassword,
      cod_rol   : 1,
      estado    : 'S'
    });
    console.log('Datos iniciales insertados');
  } catch (error) {
    console.error('Error insertando datos:', error);
  } finally {
    process.exit();
  }
})();
