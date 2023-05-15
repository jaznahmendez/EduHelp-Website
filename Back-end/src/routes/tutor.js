const express = require('express');
const router = express.Router();
const controller = require('../controllers/tutor');

const file = require('./../middlewares/file')

router.get('/uploads/:id', controller.attachments);
router.post('/upload', file.single('file'), controller.upload);

router.get('email/:email', controller.getTutorByEmail);

router.put('/:id', express.json(), controller.updateTutor);

/**
 * @swagger
 * /tutor/professional:
 *  get:
 *    description: obtener lista de profesionales activos
 *    responses:
 *      200:
 *        description: La lista de los profesionales registrados activos
 */
router.get('/professional', controller.getProfessional);

/**
 * @swagger
 * /tutor/patient/all/{id}:
 *  get:
 *    description: obtener lista de pacientes registrados a ese tutor
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: La lista de los pacientes registrados a ese tutor
 */
router.get('/patient/all/:id', controller.getPatients);

/**
 * @swagger
 * /tutor/patient/{id}:
 *  get:
 *    description: obtener paciente especifico registrado a ese tutor
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: paciente con id registrado a ese tutor
 */
router.get('/patient/:id', controller.findPatient);

/**
 * @swagger
 * /tutor/patient: 
 *  post:
 *    description: crear nueva cuenta de profesional
 *    parameters:
 *      - in: body
 *        name: nombre
 *        tutorId: id de tutor
 *        email: correo
 *        password: contraseña
 *        age: edad
 *        gender: genero
 *        tutorDescription: descripcion
 *        schema: 
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            tutorId:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string 
 *            age:
 *              type: number
 *            gender: 
 *              type: string
 *            tutorDescription: 
 *              type: string
 *    responses:
 *      200:
 *        description: nuevo profesional creado
 */
router.post('/patient', express.json(), controller.crearPaciente);

/**
 * @swagger
 * /tutor/{id}:
 *  get:
 *    description: obtener tutor especifico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del tutor a buscar
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: tutor con ese id
 */
router.get('/:id', controller.findTutor);

/**
 * @swagger
 * /tutor: 
 *  post:
 *    description: crear nueva cuenta de profesional
 *    parameters:
 *      - in: body
 *        name: nombre
 *        email: correo
 *        password: contraseña
 *        telefono: celular
 *        schema: 
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            telefono:
 *              type: string    
 *    responses:
 *      200:
 *        description: nuevo profesional creado
 */
router.post('/', express.json(), controller.crearTutor);

/**
 * @swagger
 * /tutor/patient/{id}: 
 *  delete:
 *    description: eliminar una cuenta de paciente
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: eliminar una cuenta de paciente mediante el id
 */
router.delete('/patient/:id', controller.borrarPaciente);

/**
 * @swagger
 * /tutor/{id}: 
 *  delete:
 *    description: eliminar una cuenta de tutor
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: eliminar una cuenta de tutor mediante el id
 */
router.delete('/:id', controller.borrarTutor);

module.exports = router;