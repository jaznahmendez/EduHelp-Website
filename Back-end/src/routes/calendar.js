const express = require('express');
const router = express.Router();
const admin = require('./../controllers/admin');
const patient = require('./../controllers/patient');
const professional = require('./../controllers/professional');
const tutor = require('./../controllers/tutor');

//router.post('/admin', express.json(), admin.calendarInfo);
//router.post('/patient', express.json(), patient.calendarInfo);
router.get('/professional', express.json(), professional.calendarInfo);

module.exports = router;