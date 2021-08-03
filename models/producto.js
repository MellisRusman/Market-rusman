const { Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
    },
    proveedor:{
        type:String,
        required:[true,'El proveedor es obligatorio'],
        unique: true
    },
    descripcion:{
        type:String,
        required:[true,'La descripcion es obligatoria'],
    },
    color:{
        type:String,
        required:[true,'El color es obligatorio'],
    }
})

UsuarioSchema.methods.toJSON = function () {
    const {__v, proveedor, ...perfil} = this.toObject()
    return perfil
}



module.exports = model( 'Producto', ProductoSchema )