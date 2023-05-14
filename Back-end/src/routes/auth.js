const express = require('express');
const router = express.Router();
const admin = require('./../controllers/admin');
const patient = require('./../controllers/patient');
const professional = require('./../controllers/professional');
const tutor = require('./../controllers/tutor');

router.post('/admin', express.json(), admin.googleLogin);
router.post('/patient', express.json(), patient.googleLogin);
router.post('/professional', express.json(), professional.googleLogin);
router.post('/tutor', express.json(), tutor.googleLogin);

module.exports = router;