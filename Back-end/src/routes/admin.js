const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin');

const controllerPatient = require('../controllers/patient');
const controllerProfessional = require('../controllers/professional');
const controllerTutor = require('../controllers/tutor');

/**
 * @swagger
 * /admin/tutor:
 *  get:
 *    description: obtener lista de tutores
 *    responses:
 *      200:
 *        description: La lista de los tutores registrados
 */
router.get('/tutor', controller.getTutores);

/**
 * @swagger
 * /admin:
 *  get:
 *    description: obtener lista de admins
 *    responses:
 *      200:
 *        description: La lista de los admins registrados
 */
router.get('/', controller.getAdministrador);

/**
 * @swagger
 * /admin: 
 *  post:
 *    description: crear nuevo Administrador
 *    parameters:
 *      - in: body
 *        name: nombre
 *        email: correo
 *        password: contraseña
 *        telefono: celular
 *        token: token de tipo de usuario
 *        required: true
 *        schema: 
 *          type: object
 *    responses:
 *      200:
 *        description: nuevo Administrador creado
 */
router.post('/', controller.createAdministrador);

/**
 * @swagger
 * /admin/{id}: 
 *  put:
 *    description: actualizar los parámetros de un Administrador
 *    parameters:
 *      - in: body
 *        name: nombre
 *        email: correo
 *        password: contraseña
 *        telefono: celular
 *        token: token de tipo de usuario
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: objeto de la Administrador actualizada
 */
router.put('/:id', express.json(), controller.updateAdministrador);


/**
 * @swagger
 * /admin/{id}: 
 *  get:
 *    description: listar una cuenta de Administrador por el id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: listar una cuenta de Administrador mediante el id
 */
router.get('/:id', controller.getAdministradorId);

/**
 * @swagger
 * /admin/{id}: 
 *  delete:
 *    description: eliminar una cuenta de Administrador
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: eliminar una cuenta de Administrador mediante el id
 */
router.delete('/:id', controller.deleteAdministrador);

/**
 * @swagger
 * /admin/professional/{id}: 
 *  delete:
 *    description: activar la cuenta de un profesional
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: activar la cuenta de un profesional mediante el id
 */
router.put('/professional/:id', express.json(), controller.activateProfessional);


// PATIENT
/**
 * @swagger
 * /admin/patient/{id}: 
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
router.put('patient/:id', express.json(), controllerPatient.updatePaciente)

// PROFESSIONAL
/**
 * @swagger
 * /admin/professional:
 *  get:
 *    description: obtener lista de profesionales
 *    responses:
 *      200:
 *        description: La lista de los profesionales registrados
 */
router.get('professional/', controllerProfessional.getProfessional);

/**
 * @swagger
 * /admin/profesisonal: 
 *  post:
 *    description: crear nueva cuenta de profesional
 *    parameters:
 *      - in: body
 *        name: nombre
 *        email: correo
 *        password: contraseña
 *        telefono: celular
 *        token: token de tipo de usuario
 *        active: si el administrado ya activó su cuenta o no
 *        location: ubicación de consultorio, a menos que sea en línea
 *        link: link al google calendar
 *        required: true
 *        schema: 
 *          type: object
 *    responses:
 *      200:
 *        description: nuevo profesional creado
 */
router.post('professional/', controllerProfessional.createProfessional);

/**
 * @swagger
 * /admin/professional/{id}: 
 *  put:
 *    description: actualizar los parámetros de un profesional
 *    parameters:
 *      - in: body
 *        name: nombre
 *        email: correo
 *        password: contraseña
 *        telefono: celular
 *        location: ubicación de consultorio o si lo quiere en línea
 *        link: link al google calendar
 *        required: true
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: objeto del profesional actualizado
 */
router.put('professional/:id', controllerProfessional.updateProfessional);


/**
 * @swagger
 * /admin/professional/{id}: 
 *  get:
 *    description: listar una cuenta de profesional por el id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: listar una cuenta de profesional mediante el id
 */
router.get('professional/:id', controllerProfessional.getProfessionalId);

/**
 * @swagger
 * /admin/professional/{id}: 
 *  delete:
 *    description: eliminar una cuenta de profesionl
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: eliminar una cuenta de profesional mediante el id
 */
router.delete('professional/:id', controllerProfessional.deleteProfessional);

// TUTOR

/**
 * @swagger
 * /admin/tutor/professional:
 *  get:
 *    description: obtener lista de profesionales activos
 *    responses:
 *      200:
 *        description: La lista de los profesionales registrados activos
 */
router.get('tutor/professional', controllerTutor.getProfessional);


/**
 * @swagger
 * /admin/tutor/patient:
 *  get:
 *    description: obtener lista de pacientes registrados
 *    responses:
 *      200:
 *        description: La lista de los pacientes registrados
 */
router.get('/tutor/patient', controllerTutor.getPatients);

/**
 * @swagger
 * /admin/tutor/patient:
 *  get:
 *    description: obtener lista de pacientes registrados
 *    responses:
 *      200:
 *        description: La lista de los pacientes registrados
 */
router.get('/patient/:id', controller.getPatient);

router.get('/patient', controller.getPatients);

router.delete('/patient/:id', controllerTutor.borrarPaciente);

router.post('/patient', controllerTutor.crearPaciente);

/**
 * @swagger
 * /admin/tutor/{id}:
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
router.get('tutor/:id', controllerTutor.findTutor);

/**
 * @swagger
 * /admin/tutor: 
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
router.post('tutor/', controllerTutor.crearTutor);

/**
 * @swagger
 * /admin/tutor/patient: 
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
router.post('tutor/patient', controllerTutor.crearPaciente);

/**
 * @swagger
 * /admin/tutor/{id}: 
 *  delete:
 *    description: eliminar una cuenta de profesionl
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: eliminar una cuenta de profesional mediante el id
 */
router.delete('tutor/:id', controllerTutor.borrarTutor);

module.exports = router;