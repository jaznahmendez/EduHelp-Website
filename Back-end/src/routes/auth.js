const express = require('express');
const router = express.Router();
const admin = require('./../controllers/admin');
const patient = require('./../controllers/patient');
const professional = require('./../controllers/professional');
const tutor = require('./../controllers/tutor');

router.post('/login/admin', admin.googleLogin);
router.post('/login/patient', patient.googleLogin);
router.post('/login/professional', professional.googleLogin);
router.post('/login/tutor', tutor.googleLogin);

module.exports = router;