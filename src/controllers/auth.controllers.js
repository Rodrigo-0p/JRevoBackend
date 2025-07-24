const { Usuario, Rol, Permiso, Modulo, SubModulo } = require('../models');
const bcrypt           = require('bcrypt');
const { generarToken } = require('../utils/jwt.utils');
const {log_error}      = require('../log/logger')
const sequelize        = require('sequelize');

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const vusuario = await Usuario.findOne({
     where: {
        usuario: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('usuario')),
          usuario.toLowerCase()
        ),
        estado: 'S'
      },
      include : [{ model: Rol }]
    });

    if (!vusuario) return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });

    const validPassword = await bcrypt.compare(password, vusuario.password);
    if (!validPassword) return res.status(404).json({ message: 'Contraseña incorrecta' });

    const token = generarToken({ cod_usuario: vusuario.cod_usuario });

    const permisos = await Permiso.findAll({
      where   : { cod_rol: vusuario.cod_rol },
      include : [{
        model : Modulo,
        include: [ SubModulo ] // Esto trae los submódulos del módulo
      }]
    });

    const menus = permisos.map(p => ({
      path      : p.Modulo.ruta,
      nombre    : p.Modulo.nombre,
      icono     : p.Modulo.icono,
      estado    : p.Modulo.estado,
      submodulos: p.Modulo.Submodulos.map(sub => ({
        path    : sub.ruta,
        nombre  : sub.nombre,
        icono   : sub.icono,
        estado  : sub.estado
      }))
    }));

  const permisosPorModulo    = {};
  const permisosPorSubModulo = {};

  permisos.forEach(p => {
    const moduloKey = p.Modulo.nombre.toLowerCase();

    // Guardar permisos del módulo
    permisosPorModulo[moduloKey] = {
      crear   : p.puede_crear,
      leer    : p.puede_leer,
      editar  : p.puede_editar,
      eliminar: p.puede_eliminar
    };

    // Guardar permisos heredados para cada submódulo
    if (Array.isArray(p.Modulo.Submodulos)) {
      p.Modulo.Submodulos.forEach(sub => {
        const submoduloKey = sub.nombre.toLowerCase();

        permisosPorSubModulo[submoduloKey] = {
          crear   : p.puede_crear,
          leer    : p.puede_leer,
          editar  : p.puede_editar,
          eliminar: p.puede_eliminar
        };
      });
    }
  });



    res.json({
      token   ,
      nombre  : vusuario.nombre,
      usuario : vusuario.usuario,
      menus   ,
      permisos: permisosPorModulo
    });

  } catch (error) {
    console.error('Error en login:', error);
    log_error.error(`se produjo un error en la funcion de la autenticacion ${error}`);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};