const express=require('express');
const router=express.Router();

//import passport
const passport=require('passport');
//importing   the doctor controller
const doctorController=require('../../../controllers/api/v1/doctor_controller');
//routes for regsiter doctor
router.post('/register',doctorController.create);

router.post('/login', passport.authenticate('local'), doctorController.createSession);


module.exports=router;