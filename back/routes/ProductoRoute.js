'use strict'
//rutas de cliente


var express = require('express');
var productoController = require('../controllers/ProductoController');

//inicializamos las el router de express
var api = express.Router();
//inicializacion del middleware
const auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/productos'});//esto hace que los datos adjuntos como archivos no se manejen en el req.body sino en su propia ubicacion el mismo multiparty los extraera

//ruta del post en la cual tiene la parte del url y el metodo al cual esta llamando
api.post('/registro_producto_admin',[auth.auth, path],productoController.registro_producto_admin);

//exportamos el router
module.exports=api;