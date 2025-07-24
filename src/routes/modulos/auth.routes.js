const express        = require('express');
const router         = express.Router();
const authController = require('../../controllers/auth.controllers');

// rutaBase
const base_ruta = '/public/login';
module.exports = ()=>{
  router.post(base_ruta, authController.login);
  return router;
} 