const express=require('express');
const router=express.Router();
console.log("doctors");

//importing   the doctor controller
const doctorController=require('../../../controllers/api/v1/doctor_controller');
//routes for regsiter doctor
router.post('/register',doctorController.create);

module.exports=router;