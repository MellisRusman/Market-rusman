const { Schema, model} = require('mongoose');


const ClienteSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique: true,
    },
    apellido:{
        type:String,
        required:[true,'El apellido es obligatorio'],
        unique: true,
    },
    producto: {
        type:String,
        required:[true,'El producto es obligatorio'],
    },
    cantidad:{
        type:String,
        required:[true,'La cantidad es obligatoria'],
    },
    estadoDeVenta:{
        type:String,
        default:['Abierta'],
        emun : ['Abierta', 'En transito', 'Finalizada']
    },
    estado:{
        type:String,
        default: true
    }

})

ClienteSchema.methods.toJSON = function () {
    const {__v, ...perfil} = this.toObject()
    return perfil
}



module.exports = model( 'Cliente', ClienteSchema )