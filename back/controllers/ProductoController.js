'use strict'

var producto = require('../models/Producto');

const registro_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.rol == 'admin'){
            let data = req.body;
            console.log(req.files);
            console.log(data.portada);
        }else{
            res.status(500).send({message:'NoAccess no eres admin'})
        }
    }else{
        res.status(500).send({message:'NoAccess'})
    }
}

module.exports={
    registro_producto_admin,
}