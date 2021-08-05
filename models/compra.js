const { Schema, model} = require('mongoose');


const CompraSchema = Schema({
    idProveedor:{
        type:String,
        required:[true,'El id del proveedor es obligatorio'],
    },
    idProducto:{
        type:String,
        required:[true,'El id del producto es obligatorio']
    },
    cantidad:{
        type:String,
        required:[true,'La cantidad a comprar es obligatoria'],
    },
    monto:{
        type:String,
        required:[true,'El monto a pagar es obligatorio'],
    }

})

CompraSchema.methods.toJSON = function () {
    const {__v, ...perfil} = this.toObject()
    return perfil
}



module.exports = model( 'Compra', CompraSchema )