const modelo = require('../models/professional');
const { response } = require('express');

const { OAuth2Client } = require('google-auth-library');

const { google } = require ('googleapis');
const file = require('../models/files')
const fs = require('fs');
const path = require('path')

require('dotenv').config();

const googleClient = new OAuth2Client({
    access_type: 'offline',
    client_id: process.env.GOOGLE_ID,
    client_secret: process.env.SECRET_CLIENT,
    prompt: 'consent'
})

const calendar = google.calendar({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY
});

const professionalController = {
    upload: (req, res) => {
        //console.log('File: ', req.file);
        if(!req.file) {
            res.status(400).send("archivo no soportado")
            return
        }
        else {
            file.create({
                name: req.file.originalname,
                filename: req.file.filename,
                userId: req.params.id
            }).then(res => {
                res.send(response);
            }).catch(err => {
                const uri = path.join(__dirname, '..', '..', 'uploads', req.file.filename)
                fs.unlinkSync(uri);
                res.status(400).send(err)
            });
        }
    },
    attachments: (req, res) => {
        file.find({
            userId: req.params.id
        }).then(response => {
            res.send(response)
        }).catch(err => {
            res.status(400).send(err)
        })
    },
    googleLogin: (req, res) => {
        const idToken = req.body.googleToken
        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            //console.log(idToken);
            let exists = false;
            const user = response.getPayload();
            let a = {}
            modelo.find()
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
                modelo(temp).save()
                    .then(prof =>{
                        console.log(prof)
                       res.status(200).send(prof)    
                    })  
            }
            })
        }).catch(err => {
            res.status(401).send({msg: 'token inválido'})
        })
    },
    createProfessional: (req, res) => {
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
    },
    calendarInfo: (req, res) =>{
        const idToken = req.body.googleToken;
        console.log('calendar info');
        googleClient.set
        googleClient.getAccessToken(idToken).then((req, res) => {
            console.log('acces token');
            googleClient.setCredentials({idToken}).then((req, res) => {
                console.log('CREDENTIALS SET');
            })
        }).catch();
    }
}

module.exports = professionalController