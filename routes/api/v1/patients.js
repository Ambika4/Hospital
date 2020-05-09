const express=require('express');
const router=express.Router();

//import passport
const passport=require('passport');
//importing   the doctor controller
const patientController=require('../../../controllers/api/v1/patient_controller');
//routes for regsiter patient
router.post('/register',patientController.create);

// router.post('/login', passport.authenticate('local'), patientController.createSession);


module.exports=router;