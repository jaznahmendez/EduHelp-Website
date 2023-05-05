const patient = require('../models/patient');
// nombre, correo, género

const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_ID)

class controladorPatient{
    static getPatientByToken(req, res) {
        let token = req.params.token
        let a = {}
        patient.find()
        .then(response => {
            for(let i = 0; i < response.length; i++)
            {
                let t = response[i]
                if(t.token == token) a = t; 
            }
            
            res.send(a)
        })
        .catch(error => {
            res.status(400).send()
        })
    }

    static googleLogin(req, res) {
        const idToken = req.body.googleToken
        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            const user = response.getPayload();
            const a = user

            patient.find()
            .then(response => {
                
                if(response.length == 0)
                {
                    const temp = {
                        name: user.name,
                        email: user.email,
                        token: idToken
                    }
                    a = temp;
                    patient(temp).save()
                        .then(patientt =>{
                            res.status(200).send(patientt)    
                        })
                        .catch(patientt =>{
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
    }
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