
const express  = require('express');
const router   = express.Router();
const auth     = require('./modulos/auth.routes');

module.exports = ()=>{
  // PUBLIC
  router.use( auth() );

  return router;
}