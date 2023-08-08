'use strict'
//rutas de cliente


var express = require('express');
var clienteController = require('../controllers/ClienteController');

//inicializamos las el router de express
var api = express.Router();
const auth = require('../middlewares/authenticate')

//ruta del post en la cual tiene la parte del url y el metodo al cual esta llamando
api.post('/registroCliente',clienteController.registroCliente);
api.post('/loginCliente',clienteController.loginCliente);
api.post('/registroClienteAdmin',auth.auth,clienteController.registroClienteAdmin);
api.get('/listar_clientes_filtro_admin/:tipo/:filtro',auth.auth,clienteController.listar_clientes_filtro_admin);
api.get('/obtener_cliente_admin/:id',auth.auth,clienteController.obtener_cliente_admin);
api.put('/actualizar_cliente_admin/:id',auth.auth,clienteController.actualizar_cliente_admin);
api.delete('/eliminar_cliente_admin/:id',auth.auth,clienteController.eliminar_cliente_admin);


//exportamos el router
module.exports=api;