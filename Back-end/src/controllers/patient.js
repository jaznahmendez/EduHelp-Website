const patient = require('../models/patient');
// nombre, correo, género

class controladorPatient{
    static updatePaciente(req, res){
        let obj = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender
        }
        let id = req.params.id;
        patient.findByIdAndUpdate(id, obj, {new:true})
            .then(patient => {
                console.log('Paciente Actualizado');
                res.status(200).send(patient);
            })
            .catch(err => {
                console.log('error');
                res.send('No se logro actualizar el paciente ' + err);
            });
    }
}

module.exports = controladorPatient;