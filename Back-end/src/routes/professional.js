const express = require('express');
const router = express.Router();
const controller = require('../controllers/professional');

/**
 * @swagger
 * /professional:
 *  get:
 *    description: obtener lista de profesionales
 *    responses:
 *      200:
 *        description: La lista de los profesionales registrados
 */
router.get('/', controller.getProfessional);

/**
 * @swagger
 * /profesisonal: 
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
router.post('/', express.json(), controller.createProfessional);

/**
 * @swagger
 * /professional/{id}: 
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
router.put('/:id', express.json(), controller.updateProfessional);


/**
 * @swagger
 * /professional/{id}: 
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
router.get('/:id', controller.getProfessionalId);

/**
 * @swagger
 * /professional/{id}: 
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
router.delete('/:id', controller.deleteProfessional);

module.exports = router;