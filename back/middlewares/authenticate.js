"use strict"

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'pookymesa'

exports.auth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'NoHeadersError'})
    }

    let token = req.headers.authorization.replace(/['"]+/g,'');//practica comun para remplazar las comillas y extraer el token

    let segment = token.split('.');//los token validos se dividen con puntos en 3 segmentos

    if(segment.length !=3 ){
        return res.status(403).send({message:'invalidToken'})
    }else{
        try {
            var payload = jwt.decode(token,secret);//se usa var porque necesitamos usar el payload fuera del bloque 

            if(payload.exp <= moment().unix){
                return res.status(403).send({message:'TokenExpirado'})
            }

        }catch (error) {
            return res.status(403).send({message:'invalidToken'})
        }
    }
    
    req.user = payload; //esto lo usaremos en listar_clientes_filtro_admin() del ClienteController

    // console.log(req.user) daesto o depende del payload del token,de momento solo nor importa el rol: 'admin'
    // {
            //     // sub: '64adb8a9080449973c1ce342',
            //     // nombre: 'Broky',
            //     // apellido: 'Mesa',
            //     // email: 'broky@gmail.com',
            //     // rol: 'admin',
            //     // iat: 1691105502,
            //     // exp: 1691710302
    // }


    next();//el que da permiso de seguir con el siguiente paso del middleware


}