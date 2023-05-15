const express = require('express');
const router = require('express').Router();

const rutasAdministrador = require('./admin.js');
const rutasPacientes = require('./patient')
const rutasTutores = require('./tutor')
const rutasProfesionista = require('./professional')
const rutasAuth = require('./auth.js')
const rutasCalendar = require('./calendar.js')

router.use('/login', rutasAuth)
router.use('/calendar', rutasCalendar)
router.use('/admin', rutasAdministrador)
router.use('/patient', rutasPacientes)
router.use('/tutor', rutasTutores)
router.use('/professional', rutasProfesionista)

router.get('/', function(req, res){
        res.send('Home Page');
});

router.get('*', function(req, res) {   // para cuando ponen una ruta que no está declarada, siempre tiene que ir al final
    res.status(404).send('Pagina no encontrada')
});

module.exports = router;