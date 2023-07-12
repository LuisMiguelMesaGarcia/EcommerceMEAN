'use strict'

var jwt = require('jwt-simple');//decodificador de tokens
var moment = require('moment');


var secret = 'pookymesa' //este es como el seed para crear el token

//con esta funcion se busca hacer el .encode entonces damos valores con user y creamos el playload para pasarselo como argumento al .encode
exports.createToken = function(user){
    var payload = {
        sub:user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }
    return jwt.encode(payload,secret);
}