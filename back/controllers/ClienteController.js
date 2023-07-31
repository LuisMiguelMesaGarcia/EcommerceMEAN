'use strict'

var bcrypt = require('bcrypt-nodejs');//importamos bcrypt el cual se usa para encriptar la contraseña
var cliente = require('../models/Cliente');//importamos cliente
var jwt = require('../helpers/jwt');

//registro cliente
const registroCliente = async function(req,res){
    var data=req.body; //tomamos las data de la peticion
    var clientes_arr=[];

    clientes_arr = await cliente.find({email:data.email})
    if(clientes_arr.length == 0){        
        //REGISTRO
        if(data.password){
            //encriptado de contraseña
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password=hash
                    var reg= await cliente.create(data);//en esta linea se hace el registro, el resto son validaciones
                    res.status(200).send({data:reg})
                }else{
                    res.status(200).send({message:'ErrorServer', data: undefined})
                }
            })
        }else{
            res.status(200).send({message:'No hay una contraseña', data: undefined})
        }
    }else{
        res.status(200).send({message:'El correo ya existe en la base de datos', data: undefined})
    }
}

//login cliente
const loginCliente = async function(req,res){
    var data= req.body;
    var cliente_arr = [];

    cliente_arr= await cliente.find({email:data.email})//buscamos si el correo existe y lo guardamos en el array
    if(cliente_arr.length==0){
        res.status(200).send({message:"No se encontró el correo", data:undefined});
    }else{
        //LOGIN
        let user = cliente_arr[0]; 
        
        bcrypt.compare(data.password, user.password, async function(error,check){//comparamos los password encriptados y check es un booleano el cual es verdadero si los password son iguales y falso si no
            if(check){
                res.status(200).send({
                    data:user,
                    token:jwt.createToken(user) //llamamos al token y pasamos los datos del usuario como argumento
                });
            }else{
                res.status(200).send({message:"Contraseña incorrecta", data:undefined});
            }
        });

       
    }
    

}

const listar_clientes_filtro_admin = async function(req,res){
    let reg = await cliente.find();
    res.status(200).send({data:reg})
}


module.exports = {
    registroCliente,
    loginCliente,
    listar_clientes_filtro_admin
}