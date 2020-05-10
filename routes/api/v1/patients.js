const express=require('express');
const router=express.Router();

//import passport
const passport=require('passport');
//importing   the doctor controller
const verifyToken=require('../../../config/auth').verifyToken;
const patientController=require('../../../controllers/api/v1/patient_controller');
//routes for regsiter patient
router.post('/register',verifyToken,patientController.create);

router.post('/:id/create_report', verifyToken, patientController.createReport);


module.exports=router;