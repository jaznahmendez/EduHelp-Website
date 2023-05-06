const modelo = require('../models/professional');
const { response } = require('express');

const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_ID)

const professionalController = {
    googleLogin: (req, res) => {
        const idToken = req.body.googleToken
        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            const user = response.getPayload();
            const a = user

            modelo.find()
            .then(response => {
                
                if(response.length == 0)
                {
                    const temp = {
                        name: user.name,
                        email: user.email,
                        token: idToken
                    }
                    a = temp;
                    modelo(temp).save()
                        .then(p =>{
                            res.status(200).send(p)    
                        })
                        .catch(p =>{
                            res.status(400).send()    
                        })
                }
                else {
                    for(let i = 0; i < response.length; i++)
                    {
                        let p = response[i]
                        if(p.email == user.email) a = p;
                    }
                }
                res.send(a)
            })
            .catch(error => {
                res.status(400).send()
            })

            res.send(a)
        }).catch(err => {
            res.status(401).send({msg: 'token inválido'})
        })
    },
    createProfessional: (req, res) => {
        /*let prof = {
            name: req.body.name,
            profession: req.body.profession,
            email: req.body.email,
            password: req.body.password,
            telefono: req.body.telefono,
            token: req.body.token,
            location: req.body.location,
            link: req.body.link
        }*/
        //console.log(prof)
        modelo(req.body).save()
            .then(prof =>{
                res.status(200).send(prof)    
            })
            .catch(prof =>{
                res.status(400).send('algo salió mal en la creación de la cuenta de profesional')    
            })
    },
    updateProfessional: (req, res) => {
        //console.log('good')
        modelo.findByIdAndUpdate(req.params.id, req.body)
            .then(profToUpdate =>{
                res.status(200).send(profToUpdate)    
            })
            .catch(profToUpdate =>{
                res.status(400).send('algo salió mal en actualizar la cuenta de profesional con id ' + req.params.id)    
            })
    }, // solo los activos
    getProfessional: (req, res) => {
        modelo.find()
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
                res.status(400).send('algo salió mal en el listado de cuentas de administrador')
            })
    }, // solo los activos
    getProfessionalId: (req, res) => {
        //console.log(req.params.id)
        modelo.findById(req.params.id)
            .then(profById =>{
                //console.log(profById.active == false)
                if(profById.active == true)
                {
                    res.send(profById)
                } else {
                    res.send('la cuenta de este profesional está inactiva')
                }
            })
            .catch(profById =>{
                res.status(400).send('algo salió mal en mostrar la cuenta de profesional  ', req.params.id)    
            })
    },
    deleteProfessional: (req, res) => { // YA
        modelo.findByIdAndDelete(req.params.id)
            .then(profToDelete =>{
                res.status(200).send(profToDelete)    
            })
            .catch(profToDelete =>{
                res.status(400).send('algo salió mal en eliminar la cuenta de profesional ', req.params.id)    
            })
    }
}

module.exports = professionalController