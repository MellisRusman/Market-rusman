const { Schema, model} = require('mongoose');


const ProveedorSchema = Schema({
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
    razonSocial:{
        type:String,
        required:[true,'La razon social es obligatoria'],
        unique: true,
        emun: ['S.A', 'S.R.L']
    },

})

ProveedorSchema.methods.toJSON = function () {
    const {__v, ...perfil} = this.toObject()
    return perfil
}



module.exports = model( 'Proveedore', ProveedorSchema )