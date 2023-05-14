const {Schema, model} = require('mongoose')

const administradorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String },
    token: { type: String},
    login: { type: Boolean, default: false}
})

module.exports = model('Administrador', administradorSchema)