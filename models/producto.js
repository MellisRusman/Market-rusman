const { Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
    },
    descripcion:{
        type:String,
        required:[true,'La descripcion es obligatoria'],
    },
    precio:{
        type:String,
        required:[true,'El precio es obligatorio'],
    },
    stock:{
        type:String,
        required:[true,'El stock es obligatorio'],
    }
})

UsuarioSchema.methods.toJSON = function () {
    const {__v, ...perfil} = this.toObject()
    return perfil
}



module.exports = model( 'Producto', ProductoSchema )