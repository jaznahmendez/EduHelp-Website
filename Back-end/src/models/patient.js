const {Schema, model} = require('mongoose')

const pacienteSchema = new Schema({
    name: { type: String, required: true },
    tutorId: { type: Schema.ObjectId, required: true },
    email: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    pastProffesionals: { type: Array, default: null },
    currentProffesionals: { type: Array, default: null },
    tutorDescription: { type: String }, // para que el tutor pueda poner una breve explicación de por qué el hijo necesita esa ayuda
    token: { type: String }
})

module.exports = model('Pacientes', pacienteSchema)