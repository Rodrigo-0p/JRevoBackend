const express       = require('express');
const cors          = require('cors')
const helmet        = require('helmet')
const morgan        = require('morgan')
const path          = require('path')
const routes        = require('./routes/index');
const {verifyToken} = require('./middlewares/authJwt.middlewares');
const {log_info}    = require('./log/logger')
require('dotenv').config({path:path.join(__dirname,'..','.env'),quiet: true});
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use((req, res, next)=> {
  // Allow Origins
  res.header("Access-Control-Allow-Origin", "*");
  // Allow Methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  // Allow Headers
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization, x-access-token");
  // Allow Headers
  res.header('Cross-Origin-Resource-Policy', 'same-site');
  
  // OVIAMOS LA VALIDACION DE TOKEN A LAS RUTAS PUBLICAS
  const vlogin = req.path.slice(0, 7);
  if (vlogin === '/public') return next();

  const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var direccion_ip = ip.replace("::ffff:", "");
  console.log(`ruta: ${req.path} - ${direccion_ip} - [${moment().format('DD-MM-YYYY HH:mm')}]`);
  return verifyToken(req, res, next);
})

app.use('/',routes());

module.exports = app;