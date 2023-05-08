const modelo = require('../models/admin')
const tutor = require('./tutor');
const modelTutor = require('../models/tutor');
const professional = require('../models/professional');
const patient = require('../models/patient')

const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_ID)

const adminController = {
    googleLogin: (req, res) => { 
        const idToken = req.body.googleToken
        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            const user = response.getPayload();
            let a = {}
            modelo.find()
            .then(response => {
                let exists = false;
                for(let i = 0; i < response.length; i++)
                {
                    let t = response[i]
                    if(t.email == user.email)
                    {
                        
                        exists = true
                        a = t;
                    }
                }
                //console.log(exists == false)
                if(exists == false)
                {
                    let temp = {
                        name: user.name,
                        email: user.email,
                        token: idToken
                    }
                    //console.log(temp)
                    a = temp;
                    //console.log('before save')
                    modelo(temp).save()
                        .then(admin =>{
                            console.log(admin)
                            res.status(200).send(admin)    
                        })
                        .catch(admin =>{
                            res.status(400).send('not saving correctly')    
                        })   
                }
                //console.log(exists)
                res.send(a)
            })
            .catch(error => {
                res.status(400).send()
            })

                .catch(error => {
                    res.status(400).send()
                })

            res.send(a)
        }).catch(err => {
            res.status(401).send({msg: 'token inválido'})
        })
    },
    createAdministrador: (req, res) => {
        //console.log(admin)
        modelo(req.body).save()
            .then(admin =>{
                res.status(200).send(admin)    
            })
            .catch(admin =>{
                res.status(400).send('algo salió mal en la creación de la cuenta de administrador')    
            })
    },
    updateAdministrador: (req, res) => {
        let admin = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            telefono: req.body.telefono,
            token: req.body.token
        }

        modelo.findByIdAndUpdate(req.params.id, req.body)
            .then(adminToUpdate =>{
                res.status(200).send(adminToUpdate)    
            })
            .catch(adminToUpdate =>{
                res.status(400).send('algo salió mal en actualizar la cuenta de administrador con id ' + req.params.id)    
            })
    },
    getAdministrador: (req, res) => {
        modelo.find()
            .then(response => {
                //console.log(response)
                res.send({administrador: response})
            })
            .catch(error => {
                res.status(400).send('algo salió mal en el listado de cuentas de administrador')
            })
    },
    getAdministradorId: (req, res) => {
        //console.log(req.params.id)
        modelo.findById(req.params.id)
            .then(adminById =>{
                res.status(200).send(adminById)    
            })
            .catch(adminById =>{
                res.status(400).send('algo salió mal en mostrar la cuenta de administrador ' + req.params.id)    
            })
    },
    deleteAdministrador: (req, res) => { // YA
        modelo.findByIdAndDelete(req.params.id)
            .then(adminToDelete =>{
                res.status(200).send(adminToDelete)    
            })
            .catch(adminToDelete =>{
                res.status(400).send('algo salió mal en eliminar la cuenta de administrador ' + req.params.id)    
            })
    },
    activateProfessional: (req, res) => { // YA
        let obj = {
            active: true
        }
        professional.findByIdAndUpdate(req.params.id, obj)
            .then(actProf =>{
                console.log(actProf)
                res.status(200).send(actProf)    
            })
            .catch(actProf =>{
                res.status(400).send('algo salió mal en activar la cuenta del profesional  ' + req.params.id)    
            })
    },
    getTutores: (req, res) => {
        modelTutor.find()
            .then(response => {
                res.send({tutor: response})
            })
            .catch(error => {
                res.status(400).send('algo salió mal en el listado de cuentas de tutor');
            })
    },
    getPatients: (req, res) => {
        patient.find()
            .then(response => {
                res.send({patient: response})
            })
            .catch(error => {
                res.status(400).send('algo salió mal en el listado de cuentas de paciente');
            })
    },
    getPatient: (req, res) => {
        patient.findById(req.params.id)
            .then(patientId =>{
                res.status(200).send(patientId)    
            })
            .catch(patientId =>{
                res.status(400).send('algo salió mal en actualizar la cuenta de paciente con id ', req.params.id)    
            })
    }
}

module.exports = adminController