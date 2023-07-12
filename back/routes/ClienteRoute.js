'use strict'
//rutas de cliente


var express = require('express');
var clienteController = require('../controllers/ClienteController');

//inicializamos las el router de express
var api = express.Router();


//ruta del post en la cual tiene la parte del url y el metodo al cual esta llamando
api.post('/registroCliente',clienteController.registroCliente);
api.post('/loginCliente',clienteController.loginCliente);


//exportamos el router
module.exports=api;