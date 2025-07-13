const express = require('express');
const cors    = require('cors')
const helmet  = require('helmet')
const morgan  = require('morgan')
const path    = require('path')
require('dotenv').config({path:path.join(__dirname,'..','.env'),quiet: true});

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));



module.exports = app;