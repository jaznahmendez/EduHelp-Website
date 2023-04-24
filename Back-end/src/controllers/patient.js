const patient = require('../models/patient');
// nombre, correo, género

class controladorPatient{
    static updatePaciente(req, res){
        let obj = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            age: req.body.age
        }
        let id = req.params.id;
        patient.findByIdAndUpdate(id, req.body, {new:true})
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