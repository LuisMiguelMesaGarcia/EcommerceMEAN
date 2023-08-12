'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema; //importamos los schemas de mongoose esto sirve para crear modelos

//creamos el modelo de cliente
var productoSchema = schema({
    //en cada atributo de la db vamos a especificar el tipo de dato que es con  type: tipo de dato y si es null or not null con el required:true or false en el perfil se le da una imagen por defecto con default:'perfil.png'
    titulo: {type: String, required:true},
    slug: {type: String, required:true},
    galeria: [{type: Object, required: false},],
    portada: {type: String, required:true},
    precio: {type: Number, required:true},
    descripcion: {type: String, required:true},
    contenido: {type: String, required:true},
    stock: {type: Number, required:true},
    nventas: {type: Number,default:0, required:true},
    npuntos: {type: Number,default:0, required:true},
    categoria: {type: Number, required:true},
    estado: {type: String,default:'Edicion', required:true},
    createdAt: {type: Date, default:Date.now, required: true},
})

//aqui exportamos el modelo con el nombre cliente.
module.exports = mongoose.model('producto',productoSchema)