const express = require('express')
const router = express.Router()
const pacientes = require('../controllers/patient')

/**
 * @swagger
 * /pacientes/{id}: 
 *  put:
 *    description: actualizar los parámetros de un paciente
 *    parameters:
 *      - in: body
 *        name: nombre
 *        tutorId: nombre del padre o madre
 *        email: correo
 *        password: contraseña
 *        age: edad del paciente
 *        gender: género del paciente
 *        issue: problema por el que necesita ayuda
 *        tutorDescription: más información que el tutor desee proveer del paciente
 *        token: token de tipo de usuario
 *        required: true
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: objeto de paciente actualizado
 */
router.put('/:id', express.json(), pacientes.updatePaciente)

router.get('/:token', pacientes.getPatientByToken)

module.exports = router