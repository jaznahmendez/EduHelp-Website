const {Schema, model} = require('mongoose')

const pacienteSchema = new Schema({
    name: { type: String, required: true },
    tutorId: { type: String, default: '641e4d682b2c5801e865d071' },
    email: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    pastProffesionals: { type: Array, default: null },
    currentProffesionals: { type: Array, default: null },
    tutorDescription: { type: String }, // para que el tutor pueda poner una breve explicación de por qué el hijo necesita esa ayuda
    token: { type: String },
    login: { type: Boolean, default: false}
})

module.exports = model('Pacientes', pacienteSchema)