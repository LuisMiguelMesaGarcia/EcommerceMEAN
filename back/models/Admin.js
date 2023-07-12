'use strict'

//email:broky@gmail.com
//password: 12345

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var adminSchema = schema({
    nombre: {type: String, required:true},
    apellido: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    telefono: {type: String, required: false},
    rol: {type: String, required: false},
    dni: {type: String, required: false},
})

module.exports = mongoose.model('admin',adminSchema)