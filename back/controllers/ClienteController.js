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

//GET all y filtro
const listar_clientes_filtro_admin = async function(req,res){
    if(req.user){ //auth
        if(req.user.rol == 'admin'){ //solo da permiso a Admin
            let tipo = req.params['tipo'];//estos datos llegan por la url
            let filtro = req.params['filtro'];
        
            //los null llegan como string del url los pasamos a null
            tipo = tipo === 'null' ? null : tipo; //Operador condicional (ternario)
            filtro = filtro === 'null' ? null : filtro;
        
        
            if(tipo==null){
                //lista todo
                let reg = await cliente.find();
                res.status(200).send({data:reg})
            }else{
                //filtro
                if(tipo == 'apellido'){
                    //haces un find con filtro
                    let reg = await cliente.find({apellido: new RegExp(filtro,'i')})
                    res.status(200).send({data:reg})
                }else if(tipo == 'correo'){
                    let reg = await cliente.find({email: new RegExp(filtro,'i')})
                    res.status(200).send({data:reg})
                }
            }
        }else{
            res.status(500).send({message:'NoAccess'})
        }
    }else{
        res.status(500).send({message:'NoAccess'})
    }
    
}

//POST Registro Cliente Admin
const registroClienteAdmin = async function(req,res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var data=req.body; //tomamos las data de la peticion
            var clientes_arr=[];

            clientes_arr = await cliente.find({email:data.email})
            if(clientes_arr.length == 0){        
                //REGISTRO
                //encriptado de contraseña
                bcrypt.hash("123456789",null,null, async function(err,hash){
                    if(hash){
                        data.password=hash
                        var reg= await cliente.create(data);//en esta linea se hace el registro, el resto son validaciones
                        res.status(200).send({data:reg})
                    }else{
                        res.status(200).send({message:'ErrorServer', data: undefined})
                    }
                })
            }else{
                res.status(200).send({message:'El correo ya existe en la base de datos', data: undefined})
            }
        }//iff admin
    }//if cabezera
    

    // if(req.user){
    //     if(req.user.rol == 'admin'){
    //         var data = req.body;
    //         bcrypt.hash("123456789",null,null, async function(err,hash){
    //             if(hash){
    //                 data.password=hash
    //                 console.log(data)
    //                 let reg = await Cliente.create(data)
    //                 res.status(200).send({data:reg})
    //             }else{
    //                 console.log(err)
    //                 res.status(200).send({message:'ErrorServer', reg: undefined})
    //             }
    //         })
            
    //     }
    // }
}//funcion

//GET cliente by id
const obtener_cliente_admin=async function(req,res){
    if(req.user){ //auth
        if(req.user.rol == 'admin'){ //solo da permiso a Admin

            var id=req.params['id'];

            try {
                //validacion de que existe el registro el trycatch
                var reg = await cliente.findById({_id:id});//esto encuentra con formato de objeto
            
                res.status(200).send({data:reg});
            } catch (error) {
                console.log(error)
                res.status(200).send({data:undefined})
            }

        }else{
            res.status(500).send({message:'NoAccess'})
        }
    }else{
        res.status(500).send({message:'NoAccess'})
    }
}

//PUT Actualizar cliente admin
const actualizar_cliente_admin = async function(req,res){
    if(req.user){ //auth
        if(req.user.rol == 'admin'){ //solo da permiso a Admin

            var id=req.params['id'];
            var data = req.body;

            //pasamos el objeto que se va a actualizar en data=req.body vienen los datos del formulario
            var reg = await cliente.findByIdAndUpdate({_id:id}, {
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email ,
                telefono: data.telefono ,
                genero: data.genero ,
                f_nacimiento: data.f_nacimiento ,
                dni: data.dni   
            })
            res.status(200).send({data:reg})

        }else{
            res.status(500).send({message:'NoAccess'})
        }
    }else{
        res.status(500).send({message:'NoAccess'})
    }
}

//DELETE Eliminar cliente admin
const eliminar_cliente_admin = async function(req,res){
    if(req.user){ //auth
        if(req.user.rol == 'admin'){ //solo da permiso a Admin

            var id=req.params['id'];

            let reg = await cliente.findByIdAndRemove(id);
            res.status(200).send({data:reg});
            
        }else{
            res.status(500).send({message:'NoAccess'})
        }
    }else{
        res.status(500).send({message:'NoAccess'})
    }
}

module.exports = {
    registroCliente,
    loginCliente,
    listar_clientes_filtro_admin,
    registroClienteAdmin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin
}