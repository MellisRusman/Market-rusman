const { Schema, model} = require('mongoose');


const ChequeSchema = Schema({
    fecha:{
        type:String,
        required:[true,'La fecha es obligatoria'],
    },
    monto:{
        type:String,
        required:[true,'El monto es obligatorio'],
    },
    remitente: {
        type:String,
        required:[true,'El remitente es obligatorio'],
    },
    estado: {
        type:Boolean,
        default: true
    }

})

ChequeSchema.methods.toJSON = function () {
    const {__v, ...perfil} = this.toObject()
    return perfil
}



module.exports = model( 'Cheque', ChequeSchema )