'use strict'
//archivo que inicializa el backend conectamos base de datos etc.

//estos son los import
var express = require('express');//framework de node.js
var app = express();//inicializacion de nuestro paquete express
var bodyparser = require('body-parser');
var mongoose = require('mongoose');//dependencia para conectar la base de datos MongoDB
var port = process.env.port || 4201;//Puerto de ejecucion del backend
var cliente_route = require('./routes/ClienteRoute') //inicializacmos las rutas de cliente
var admin_route = require('./routes/AdminRoute') //Admin
var producto_route = require('./routes/ProductoRoute') //producto

//conexion a la base de datos y revisar si conecta o no
mongoose.connect('mongodb://127.0.0.1:27017/tienda')//el link de la base de datos tiene que estar en numero si poner localhost no funciona bien.
.then(
    app.listen(port,function(){
        console.log("servidor corriendo en el puerto" + port)
        }
    )
).catch((err)=>{
    console.error(err);
})

app.use(bodyparser.urlencoded({extended:true}));//codifica la peticion
app.use(bodyparser.json({limit:'50mb', extended:true}));//codifica el objeto JSON

//CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', cliente_route);//cliente
app.use('/api', admin_route);//Admin
app.use('/api', producto_route);//producto

module.exports = app;
