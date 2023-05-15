const tutor = require('../models/tutor');
const patient = require('../models/patient');
const professional = require('../models/professional');
const { response } = require('express');

const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_ID)

class controladorTutor{
    static googleLogin(req, res) {
        
        const idToken = req.body.googleToken
        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            //console.log(idToken);
            let exists = false;
            const user = response.getPayload();
            let a = {}
            tutor.find()
            .then(response => {
                for(let i = 0; i < response.length; i++)
                {
                    let t = response[i]
                    if(t.email == user.email)
                    {
                        
                        exists = true
                        a = t;
                        res.send(a)
                    }
                }

                if(exists == false)
            {
                let temp = {
                    name: user.name,
                    email: user.email,
                    token: idToken,
                    login: true
                }
                a = temp;
                tutor(temp).save()
                    .then(tutor =>{
                        console.log(tutor)
                       res.status(200).send(tutor)    
                    })  
            }
            })
        }).catch(err => {
            res.status(401).send({msg: 'token inválido'})
        })
    }
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
        console.log('entra a tutor')
        /*let obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            telefono: req.body.telefono
        }*/
        console.log(req.body)
        tutor(req.body).save().then(tutor => {
                console.log("Document inserted successfully");
                res.status(200).send(tutor);
            }).catch(err => {
                console.error("Failed to insert the document");
                res.send(err);
            });
    }

    static getTutorByEmail(req, res)
    {
        let email = req.params.email
        let a = {}
        tutor.find()
        .then(response => {
            for(let i = 0; i < response.length; i++)
            {
                let t = response[i]
                if(t.email == email) a = t; 
            }
            
            res.send(a)
        })
        .catch(error => {
            res.status(400).send()
        })
    }

    static updateTutor(req, res){
        
        /*let obj = {
            name: req.body.name,
            email: req.body.password,
            password: req.body.password,
            telefono: req.body.telefono
        }*/
        //console.log("ñam ña,", req.body);
        console.log(req.params.id)
        tutor.findByIdAndUpdate(req.params.id, req.body).then(tutor => {
                console.log(tutor)
                res.status(200).send(tutor);
            }).catch(err => {
                console.error("Failed to update the document");
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
        console.log(id)
        patient.findByIdAndDelete(id)
            .then(patient => {
                let tutorId = patient.tutorId;
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