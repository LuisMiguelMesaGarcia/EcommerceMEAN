'use strict'

var bcrypt =  require('bcrypt-nodejs');
var admin = require('../models/Admin');
var jwt = require('../helpers/jwt');

//POST registro
const registroAdmin = async function(req,res){
    var data=req.body;
    var admin_arr=[];

    admin_arr = await admin.find({email:data.email})
    if(admin_arr.length == 0){        
        //REGISTRO
        if(data.password){
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password=hash
                    var reg= await admin.create(data);//registro
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

//POST Login
const loginAdmin = async function(req,res){
    var data= req.body;
    var admin_arr = [];

    admin_arr= await admin.find({email:data.email})//buscamos si el correo existe y lo guardamos en el array
    if(admin_arr.length==0){
        res.status(200).send({message:"No se encontró el correo", data:undefined});
    }else{
        //LOGIN
        let user = admin_arr[0]; 
        
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

module.exports = {
    registroAdmin,
    loginAdmin
}