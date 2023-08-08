'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema; //importamos los schemas de mongoose esto sirve para crear modelos

//creamos el modelo de cliente
var clienteSchema = schema({
    //en cada atributo de la db vamos a especificar el tipo de dato que es con  type: tipo de dato y si es null or not null con el required:true or false en el perfil se le da una imagen por defecto con default:'perfil.png'
    nombre: {type: String, required:true},
    apellido: {type: String, required: true},
    pais: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    perfil: {type: String, default: 'perfil.png', required: false},
    telefono: {type: String, required: false},
    genero: {type: String, required: false},
    f_nacimiento: {type: String, required: false},
    dni: {type: String, required: false},
    createdAt: {type: Date, default:Date.now, required: true},
})

//aqui exportamos el modelo con el nombre cliente.
module.exports = mongoose.model('cliente',clienteSchema)