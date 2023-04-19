const tutor = require('../models/tutor');
const patient = require('../models/patient');
const professional = require('../models/professional');
const { response } = require('express');

class controladorTutor{
    static findTutor (req, res){
        let id = req.params.id;
        tutor.findById(id)
            .then(tutor => {
                res.send(tutor);
            })
            .catch(err => {
                console.log('error');
                res.send('No se encuentran tutores con ese ID ' + err);
            });
    }

    static crearTutor(req, res){
        let obj = {
            name: req.body.name,
            email: req.body.password,
            password: req.body.password,
            telefono: req.body.telefono
        }
        tutor(obj).save().then(tutor => {
                console.log("Document inserted successfully");
                res.status(200).send(tutor);
            }).catch(err => {
                console.error("Failed to insert the document");
                res.send(err);
            });
    }


    static borrarTutor(req, res){
        let id = req.params.id;
        tutor.findById(id)
            .then(tutor =>{
                console.log("find :)");
                for(let i = 0; i < tutor.hijos.length; i++){
                    patient.findByIdAndDelete(tutor.hijos[i]).then(response =>{
                        //console.log("deleted");
                    }).catch(err => {
                        res.send(err);
                    })
                }
            }).catch(err =>{
                res.send(err);
        });

        tutor.findByIdAndDelete(id).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.send(err);
        })
        
    }

    //Permisos para pacientes
    static getPatients(req, res){
        let id = req.params.id;
        tutor.findById(id)
            .then(tutor =>{
                 patient.find({
                    '_id': {$in: tutor.hijos}
                }).then(response => {
                    res.send(response);
                }).catch(err => {
                    res.send(err);
                });
            }).catch(err =>{
                res.send(err);
        });
    }

    static findPatient (req, res){
        let id = req.params.id;
        patient.findById(id)
            .then(patient => {
                res.send(patient);
            })
            .catch(err => {
                console.log('error');
                res.send('No se encuentran pacientes con ese ID ' + err);
            });
    }

    static crearPaciente(req, res){
        let obj = {
            name: req.body.name,
            tutorId: req.body.tutorId,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            gender: req.body.gender,
            tutorDescription: req.body.tutorDescription, // para que el tutor pueda poner una breve explicación de por qué el hijo necesita esa ayuda
        }
        patient(obj).save().then( NewPatient => {
                console.log("Document inserted successfully");
                tutor.findByIdAndUpdate(NewPatient.tutorId, {$push:{
                    "hijos": NewPatient.id}
                }, {new:true}).then(response =>{
                    res.status(200).send(NewPatient);
                })  
            }).catch(err => {
                console.error("Failed to insert the document");
                res.send(err);
        });
    }

    static borrarPaciente(req, res){
        let id = req.params.id;
        patient.findByIdAndDelete(id)
            .then(patient => {
                console.log('Paciente Eliminado');
                res.send(patient);
            })
            .catch(err => {
                console.log('error');
                res.send('No se encuentran pacientes con ese ID ' + err);
            });
    }

    //Mostrar profesionales activos
    static getProfessional(req, res){
        professional.find()
            .then(response => {
                //console.log(response[0])
                let temp = []
                for(let i = 0; i < response.length; i++)
                {
                   if(response[i].active) temp.push(response[i])
                }
                res.send({professional: temp})
            })
            .catch(error => {
                res.status(400).send('algo salió mal en el listado de cuentas de profesionales')
            })
    }// solo los activos
}

module.exports = controladorTutor;