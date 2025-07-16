const jwt   = require('jsonwebtoken');
const path  = require('path')
require('dotenv').config({path:path.join(__dirname,'..','..','.env'),quiet: true});

exports.generarToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
};
