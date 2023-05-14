const {Schema, model} = require('mongoose')

const tutorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    telefono: { type: String },
    hijos: { type: [Schema.ObjectId], default: [] }, // array de los ids de sus hijos, si solo tiene uno pues solo tiene un elemento el array
    token: { type: String },
    login: { type: Boolean, default: false }
})

module.exports = model('Tutores', tutorSchema)