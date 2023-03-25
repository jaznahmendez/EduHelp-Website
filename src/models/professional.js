const {Schema, model} = require('mongoose')

const profesionistaSchema = new Schema({
    name: { type: String, required: true },
    profession: { type: String, default: 'no description' },
    email: { type: String },
    password: { type: String },
    telefono: { type: String },
    token: { type: String },
    active: { type: Boolean, default: false},
    location: { type: String, default: 'online' },
    link: { type: String } // link a su google calendar
})

module.exports = model('Profesionista', profesionistaSchema)