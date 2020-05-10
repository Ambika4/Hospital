const express=require('express');
const router=express.Router();

//import passport
const passport=require('passport');
//importing   the doctor controller
const verifyToken=require('../../../config/auth').verifyToken;
const reportController=require('../../../controllers/api/v1/report_controller');

router.get('/:status',verifyToken,reportController.status);


module.exports=router;