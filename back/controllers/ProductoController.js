'use strict'

var Producto = require('../models/Producto');

//POST Registrar productos
const registro_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.rol == 'admin'){
            let data = req.body;

            var img_path = req.files.portada.path;
            var name = img_path.split('\\');//aqui dividimos el path para luego sacar el nombre de la imagen
            var portada_name = name[2];//aqui separamos el nombre de la imagen

            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');//el slug que esta en el modelo
            data.portada = portada_name;//en la key portada le ponemos el nombre de la imagen porque normalmente viene el file que recibe el multiparty
            let reg = await Producto.create(data);
            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message:'NoAccess no eres admin'})
        }
    }else{
        res.status(500).send({message:'NoAccess'})
    }
}

//GET Listar todos los productos
const listar_productos_admin = async function(req,res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var filtro = req.params['filtro'];//recibimos el filtro de la url
            //aqui se va a hacer la busqueda como tal
            let reg = await Producto.find({titulo: new RegExp(filtro, 'i')});//La expresión regular regExp busca la i sin importar mayusculas ni minusculas
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message:'NoAccess no eres admin'})
        }
    }else{
        res.status(500).send({message:'NoAccess'})
    }
}


module.exports={
    registro_producto_admin,
    listar_productos_admin
}